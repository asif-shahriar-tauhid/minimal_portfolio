import { Router, type NextFunction, type Request, type Response } from "express";
import type { ZodType } from "zod";
import { requireAdmin } from "./auth";

/** Minimal shape shared by every Prisma model delegate we expose. */
interface Delegate {
  findMany(args?: unknown): Promise<unknown[]>;
  findUnique(args: unknown): Promise<unknown>;
  create(args: unknown): Promise<unknown>;
  update(args: unknown): Promise<unknown>;
  delete(args: unknown): Promise<unknown>;
}

type Handler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

/** Forwards async errors to the Express error handler. */
export const wrap =
  (fn: Handler) =>
  (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next);

interface CrudOptions {
  delegate: Delegate;
  schema: ZodType;
  orderBy?: unknown;
  include?: unknown;
}

/**
 * Builds a REST router: public GET list/item, admin-only POST/PUT/DELETE.
 * Validation errors bubble up as ZodErrors and are turned into 400s centrally.
 */
export function crudRouter({ delegate, schema, orderBy = { order: "asc" }, include }: CrudOptions) {
  const router = Router();

  router.get(
    "/",
    wrap(async (_req, res) => {
      res.json(await delegate.findMany({ orderBy, include }));
    }),
  );

  router.get(
    "/:id",
    wrap(async (req, res) => {
      const item = await delegate.findUnique({ where: { id: req.params.id }, include });
      if (!item) return res.status(404).json({ error: "Not found" });
      res.json(item);
    }),
  );

  router.post(
    "/",
    requireAdmin,
    wrap(async (req, res) => {
      const data = schema.parse(req.body);
      res.status(201).json(await delegate.create({ data }));
    }),
  );

  router.put(
    "/:id",
    requireAdmin,
    wrap(async (req, res) => {
      const data = schema.parse(req.body);
      res.json(await delegate.update({ where: { id: req.params.id }, data }));
    }),
  );

  router.delete(
    "/:id",
    requireAdmin,
    wrap(async (req, res) => {
      await delegate.delete({ where: { id: req.params.id } });
      res.status(204).end();
    }),
  );

  return router;
}
