
      import {createRequire} from 'module';
      const require = createRequire(import.meta.url);
    
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/index.ts
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { ZodError } from "zod";

// src/db.ts
import { PrismaPg } from "@prisma/adapter-pg";

// src/generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// src/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.10.0",
  "engineVersion": "0edf323efd1d98336f3f0a68684b56f689b900d3",
  "activeProvider": "postgresql",
  "inlineSchema": '// Prisma 7 schema \u2014 the datasource URL lives in prisma.config.ts, and the\n// client is generated into src/generated/prisma (no more node_modules magic).\n\ngenerator client {\n  provider     = "prisma-client"\n  output       = "../src/generated/prisma"\n  moduleFormat = "esm"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\n/// Singleton row (id = 1) holding hero, about and contact content.\nmodel Profile {\n  id               Int      @id @default(1)\n  name             String\n  alias            String?\n  designation      String\n  location         String?\n  isAvailable      Boolean  @default(true)\n  availabilityText String   @default("Available for work")\n  heroIntro        String\n  photoUrl         String?\n  resumeUrl        String?\n  aboutParagraphs  String[]\n  highlights       String[]\n  email            String\n  phone            String?\n  whatsapp         String?\n  contactBlurb     String?\n  footerText       String?\n  updatedAt        DateTime @updatedAt\n}\n\nmodel SocialLink {\n  id         String  @id @default(cuid())\n  label      String\n  url        String\n  showInHero Boolean @default(true)\n  order      Int     @default(0)\n}\n\nmodel SkillCategory {\n  id     String  @id @default(cuid())\n  name   String\n  order  Int     @default(0)\n  skills Skill[]\n}\n\nmodel Skill {\n  id         String        @id @default(cuid())\n  name       String\n  icon       String?\n  /// Self-assessed proficiency 0\u2013100, rendered as a meter on the site.\n  level      Int           @default(70)\n  order      Int           @default(0)\n  categoryId String\n  category   SkillCategory @relation(fields: [categoryId], references: [id], onDelete: Cascade)\n\n  @@index([categoryId])\n}\n\nmodel Experience {\n  id           String   @id @default(cuid())\n  role         String\n  company      String\n  companyUrl   String?\n  location     String?\n  employment   String?\n  startDate    String\n  endDate      String?\n  description  String?\n  highlights   String[]\n  technologies String[]\n  order        Int      @default(0)\n}\n\nmodel Education {\n  id          String  @id @default(cuid())\n  degree      String\n  institution String\n  location    String?\n  startDate   String?\n  endDate     String?\n  result      String?\n  description String?\n  coursework  String?\n  order       Int     @default(0)\n}\n\nmodel Project {\n  id           String   @id @default(cuid())\n  slug         String   @unique\n  title        String\n  category     String?\n  summary      String\n  imageUrl     String?\n  description  String\n  techStack    String[]\n  liveUrl      String?\n  repoUrl      String?\n  challenges   String\n  improvements String\n  featured     Boolean  @default(true)\n  order        Int      @default(0)\n  createdAt    DateTime @default(now())\n  updatedAt    DateTime @updatedAt\n}\n\nmodel Message {\n  id        String   @id @default(cuid())\n  name      String\n  email     String\n  body      String\n  read      Boolean  @default(false)\n  createdAt DateTime @default(now())\n\n  @@index([createdAt])\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Profile":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"name","kind":"scalar","type":"String"},{"name":"alias","kind":"scalar","type":"String"},{"name":"designation","kind":"scalar","type":"String"},{"name":"location","kind":"scalar","type":"String"},{"name":"isAvailable","kind":"scalar","type":"Boolean"},{"name":"availabilityText","kind":"scalar","type":"String"},{"name":"heroIntro","kind":"scalar","type":"String"},{"name":"photoUrl","kind":"scalar","type":"String"},{"name":"resumeUrl","kind":"scalar","type":"String"},{"name":"aboutParagraphs","kind":"scalar","type":"String"},{"name":"highlights","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"whatsapp","kind":"scalar","type":"String"},{"name":"contactBlurb","kind":"scalar","type":"String"},{"name":"footerText","kind":"scalar","type":"String"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null,"schema":null},"SocialLink":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"label","kind":"scalar","type":"String"},{"name":"url","kind":"scalar","type":"String"},{"name":"showInHero","kind":"scalar","type":"Boolean"},{"name":"order","kind":"scalar","type":"Int"}],"dbName":null,"schema":null},"SkillCategory":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"order","kind":"scalar","type":"Int"},{"name":"skills","kind":"object","type":"Skill","relationName":"SkillToSkillCategory"}],"dbName":null,"schema":null},"Skill":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"icon","kind":"scalar","type":"String"},{"name":"level","kind":"scalar","type":"Int"},{"name":"order","kind":"scalar","type":"Int"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"SkillCategory","relationName":"SkillToSkillCategory"}],"dbName":null,"schema":null},"Experience":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"role","kind":"scalar","type":"String"},{"name":"company","kind":"scalar","type":"String"},{"name":"companyUrl","kind":"scalar","type":"String"},{"name":"location","kind":"scalar","type":"String"},{"name":"employment","kind":"scalar","type":"String"},{"name":"startDate","kind":"scalar","type":"String"},{"name":"endDate","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"highlights","kind":"scalar","type":"String"},{"name":"technologies","kind":"scalar","type":"String"},{"name":"order","kind":"scalar","type":"Int"}],"dbName":null,"schema":null},"Education":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"degree","kind":"scalar","type":"String"},{"name":"institution","kind":"scalar","type":"String"},{"name":"location","kind":"scalar","type":"String"},{"name":"startDate","kind":"scalar","type":"String"},{"name":"endDate","kind":"scalar","type":"String"},{"name":"result","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"coursework","kind":"scalar","type":"String"},{"name":"order","kind":"scalar","type":"Int"}],"dbName":null,"schema":null},"Project":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"category","kind":"scalar","type":"String"},{"name":"summary","kind":"scalar","type":"String"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"techStack","kind":"scalar","type":"String"},{"name":"liveUrl","kind":"scalar","type":"String"},{"name":"repoUrl","kind":"scalar","type":"String"},{"name":"challenges","kind":"scalar","type":"String"},{"name":"improvements","kind":"scalar","type":"String"},{"name":"featured","kind":"scalar","type":"Boolean"},{"name":"order","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null,"schema":null},"Message":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"body","kind":"scalar","type":"String"},{"name":"read","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null,"schema":null}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","Profile.findUnique","Profile.findUniqueOrThrow","orderBy","cursor","Profile.findFirst","Profile.findFirstOrThrow","Profile.findMany","data","Profile.createOne","Profile.createMany","Profile.createManyAndReturn","Profile.updateOne","Profile.updateMany","Profile.updateManyAndReturn","create","update","Profile.upsertOne","Profile.deleteOne","Profile.deleteMany","having","_count","_avg","_sum","_min","_max","Profile.groupBy","Profile.aggregate","SocialLink.findUnique","SocialLink.findUniqueOrThrow","SocialLink.findFirst","SocialLink.findFirstOrThrow","SocialLink.findMany","SocialLink.createOne","SocialLink.createMany","SocialLink.createManyAndReturn","SocialLink.updateOne","SocialLink.updateMany","SocialLink.updateManyAndReturn","SocialLink.upsertOne","SocialLink.deleteOne","SocialLink.deleteMany","SocialLink.groupBy","SocialLink.aggregate","category","skills","SkillCategory.findUnique","SkillCategory.findUniqueOrThrow","SkillCategory.findFirst","SkillCategory.findFirstOrThrow","SkillCategory.findMany","SkillCategory.createOne","SkillCategory.createMany","SkillCategory.createManyAndReturn","SkillCategory.updateOne","SkillCategory.updateMany","SkillCategory.updateManyAndReturn","SkillCategory.upsertOne","SkillCategory.deleteOne","SkillCategory.deleteMany","SkillCategory.groupBy","SkillCategory.aggregate","Skill.findUnique","Skill.findUniqueOrThrow","Skill.findFirst","Skill.findFirstOrThrow","Skill.findMany","Skill.createOne","Skill.createMany","Skill.createManyAndReturn","Skill.updateOne","Skill.updateMany","Skill.updateManyAndReturn","Skill.upsertOne","Skill.deleteOne","Skill.deleteMany","Skill.groupBy","Skill.aggregate","Experience.findUnique","Experience.findUniqueOrThrow","Experience.findFirst","Experience.findFirstOrThrow","Experience.findMany","Experience.createOne","Experience.createMany","Experience.createManyAndReturn","Experience.updateOne","Experience.updateMany","Experience.updateManyAndReturn","Experience.upsertOne","Experience.deleteOne","Experience.deleteMany","Experience.groupBy","Experience.aggregate","Education.findUnique","Education.findUniqueOrThrow","Education.findFirst","Education.findFirstOrThrow","Education.findMany","Education.createOne","Education.createMany","Education.createManyAndReturn","Education.updateOne","Education.updateMany","Education.updateManyAndReturn","Education.upsertOne","Education.deleteOne","Education.deleteMany","Education.groupBy","Education.aggregate","Project.findUnique","Project.findUniqueOrThrow","Project.findFirst","Project.findFirstOrThrow","Project.findMany","Project.createOne","Project.createMany","Project.createManyAndReturn","Project.updateOne","Project.updateMany","Project.updateManyAndReturn","Project.upsertOne","Project.deleteOne","Project.deleteMany","Project.groupBy","Project.aggregate","Message.findUnique","Message.findUniqueOrThrow","Message.findFirst","Message.findFirstOrThrow","Message.findMany","Message.createOne","Message.createMany","Message.createManyAndReturn","Message.updateOne","Message.updateMany","Message.updateManyAndReturn","Message.upsertOne","Message.deleteOne","Message.deleteMany","Message.groupBy","Message.aggregate","AND","OR","NOT","id","name","email","body","read","createdAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","slug","title","summary","imageUrl","description","techStack","liveUrl","repoUrl","challenges","improvements","featured","order","updatedAt","has","hasEvery","hasSome","degree","institution","location","startDate","endDate","result","coursework","role","company","companyUrl","employment","highlights","technologies","icon","level","categoryId","every","some","none","label","url","showInHero","alias","designation","isAvailable","availabilityText","heroIntro","photoUrl","resumeUrl","aboutParagraphs","phone","whatsapp","contactBlurb","footerText","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","push","increment","decrement","multiply","divide"]'),
  graph: "wQJQgAEVjgEAAPMBADCPAQAABAAQkAEAAPMBADCRAQIAAAABkgEBANcBACGTAQEA1wEAIa4BQADZAQAhtAEBAOQBACG9AQAA3AEAIMgBAQDkAQAhyQEBANcBACHKASAA2AEAIcsBAQDXAQAhzAEBANcBACHNAQEA5AEAIc4BAQDkAQAhzwEAANwBACDQAQEA5AEAIdEBAQDkAQAh0gEBAOQBACHTAQEA5AEAIQEAAAABACABAAAAAQAgFY4BAADzAQAwjwEAAAQAEJABAADzAQAwkQECAOUBACGSAQEA1wEAIZMBAQDXAQAhrgFAANkBACG0AQEA5AEAIb0BAADcAQAgyAEBAOQBACHJAQEA1wEAIcoBIADYAQAhywEBANcBACHMAQEA1wEAIc0BAQDkAQAhzgEBAOQBACHPAQAA3AEAINABAQDkAQAh0QEBAOQBACHSAQEA5AEAIdMBAQDkAQAhCLQBAAD6AQAgyAEAAPoBACDNAQAA-gEAIM4BAAD6AQAg0AEAAPoBACDRAQAA-gEAINIBAAD6AQAg0wEAAPoBACADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACASkQECAAAAAZIBAQAAAAGTAQEAAAABrgFAAAAAAbQBAQAAAAG9AQAAuwIAIMgBAQAAAAHJAQEAAAABygEgAAAAAcsBAQAAAAHMAQEAAAABzQEBAAAAAc4BAQAAAAHPAQAAugIAINABAQAAAAHRAQEAAAAB0gEBAAAAAdMBAQAAAAEBCAAACQAgEpEBAgAAAAGSAQEAAAABkwEBAAAAAa4BQAAAAAG0AQEAAAABvQEAALsCACDIAQEAAAAByQEBAAAAAcoBIAAAAAHLAQEAAAABzAEBAAAAAc0BAQAAAAHOAQEAAAABzwEAALoCACDQAQEAAAAB0QEBAAAAAdIBAQAAAAHTAQEAAAABAQgAAAsAMAEIAAALADASkQECAIICACGSAQEA9wEAIZMBAQD3AQAhrgFAAPkBACG0AQEAgAIAIb0BAAC5AgAgyAEBAIACACHJAQEA9wEAIcoBIAD4AQAhywEBAPcBACHMAQEA9wEAIc0BAQCAAgAhzgEBAIACACHPAQAAuAIAINABAQCAAgAh0QEBAIACACHSAQEAgAIAIdMBAQCAAgAhAgAAAAEAIAgAAA4AIBKRAQIAggIAIZIBAQD3AQAhkwEBAPcBACGuAUAA-QEAIbQBAQCAAgAhvQEAALkCACDIAQEAgAIAIckBAQD3AQAhygEgAPgBACHLAQEA9wEAIcwBAQD3AQAhzQEBAIACACHOAQEAgAIAIc8BAAC4AgAg0AEBAIACACHRAQEAgAIAIdIBAQCAAgAh0wEBAIACACECAAAABAAgCAAAEAAgAgAAAAQAIAgAABAAIAMAAAABACAPAAAJACAQAAAOACABAAAAAQAgAQAAAAQAIA0VAACzAgAgFgAAtAIAIBcAALcCACAYAAC2AgAgGQAAtQIAILQBAAD6AQAgyAEAAPoBACDNAQAA-gEAIM4BAAD6AQAg0AEAAPoBACDRAQAA-gEAINIBAAD6AQAg0wEAAPoBACAVjgEAAPIBADCPAQAAFwAQkAEAAPIBADCRAQIA3QEAIZIBAQDMAQAhkwEBAMwBACGuAUAAzgEAIbQBAQDbAQAhvQEAANwBACDIAQEA2wEAIckBAQDMAQAhygEgAM0BACHLAQEAzAEAIcwBAQDMAQAhzQEBANsBACHOAQEA2wEAIc8BAADcAQAg0AEBANsBACHRAQEA2wEAIdIBAQDbAQAh0wEBANsBACEDAAAABAAgAwAAFgAwFAAAFwAgAwAAAAQAIAMAAAUAMAQAAAEAIAiOAQAA8QEAMI8BAAAdABCQAQAA8QEAMJEBAQAAAAGtAQIA5QEAIcUBAQDXAQAhxgEBANcBACHHASAA2AEAIQEAAAAaACABAAAAGgAgCI4BAADxAQAwjwEAAB0AEJABAADxAQAwkQEBANcBACGtAQIA5QEAIcUBAQDXAQAhxgEBANcBACHHASAA2AEAIQADAAAAHQAgAwAAHgAwBAAAGgAgAwAAAB0AIAMAAB4AMAQAABoAIAMAAAAdACADAAAeADAEAAAaACAFkQEBAAAAAa0BAgAAAAHFAQEAAAABxgEBAAAAAccBIAAAAAEBCAAAIgAgBZEBAQAAAAGtAQIAAAABxQEBAAAAAcYBAQAAAAHHASAAAAABAQgAACQAMAEIAAAkADAFkQEBAPcBACGtAQIAggIAIcUBAQD3AQAhxgEBAPcBACHHASAA-AEAIQIAAAAaACAIAAAnACAFkQEBAPcBACGtAQIAggIAIcUBAQD3AQAhxgEBAPcBACHHASAA-AEAIQIAAAAdACAIAAApACACAAAAHQAgCAAAKQAgAwAAABoAIA8AACIAIBAAACcAIAEAAAAaACABAAAAHQAgBRUAAK4CACAWAACvAgAgFwAAsgIAIBgAALECACAZAACwAgAgCI4BAADwAQAwjwEAADAAEJABAADwAQAwkQEBAMwBACGtAQIA3QEAIcUBAQDMAQAhxgEBAMwBACHHASAAzQEAIQMAAAAdACADAAAvADAUAAAwACADAAAAHQAgAwAAHgAwBAAAGgAgBy0AAO0BACCOAQAA7AEAMI8BAAA7ABCQAQAA7AEAMJEBAQAAAAGSAQEA1wEAIa0BAgDlAQAhAQAAADMAIAosAADvAQAgjgEAAO4BADCPAQAANQAQkAEAAO4BADCRAQEA1wEAIZIBAQDXAQAhrQECAOUBACG_AQEA5AEAIcABAgDlAQAhwQEBANcBACECLAAArQIAIL8BAAD6AQAgCiwAAO8BACCOAQAA7gEAMI8BAAA1ABCQAQAA7gEAMJEBAQAAAAGSAQEA1wEAIa0BAgDlAQAhvwEBAOQBACHAAQIA5QEAIcEBAQDXAQAhAwAAADUAIAMAADYAMAQAADcAIAEAAAA1ACABAAAAMwAgBy0AAO0BACCOAQAA7AEAMI8BAAA7ABCQAQAA7AEAMJEBAQDXAQAhkgEBANcBACGtAQIA5QEAIQEtAACsAgAgAwAAADsAIAMAADwAMAQAADMAIAMAAAA7ACADAAA8ADAEAAAzACADAAAAOwAgAwAAPAAwBAAAMwAgBC0AAKsCACCRAQEAAAABkgEBAAAAAa0BAgAAAAEBCAAAQAAgA5EBAQAAAAGSAQEAAAABrQECAAAAAQEIAABCADABCAAAQgAwBC0AAJ4CACCRAQEA9wEAIZIBAQD3AQAhrQECAIICACECAAAAMwAgCAAARQAgA5EBAQD3AQAhkgEBAPcBACGtAQIAggIAIQIAAAA7ACAIAABHACACAAAAOwAgCAAARwAgAwAAADMAIA8AAEAAIBAAAEUAIAEAAAAzACABAAAAOwAgBRUAAJkCACAWAACaAgAgFwAAnQIAIBgAAJwCACAZAACbAgAgBo4BAADrAQAwjwEAAE4AEJABAADrAQAwkQEBAMwBACGSAQEAzAEAIa0BAgDdAQAhAwAAADsAIAMAAE0AMBQAAE4AIAMAAAA7ACADAAA8ADAEAAAzACABAAAANwAgAQAAADcAIAMAAAA1ACADAAA2ADAEAAA3ACADAAAANQAgAwAANgAwBAAANwAgAwAAADUAIAMAADYAMAQAADcAIAcsAACYAgAgkQEBAAAAAZIBAQAAAAGtAQIAAAABvwEBAAAAAcABAgAAAAHBAQEAAAABAQgAAFYAIAaRAQEAAAABkgEBAAAAAa0BAgAAAAG_AQEAAAABwAECAAAAAcEBAQAAAAEBCAAAWAAwAQgAAFgAMAcsAACXAgAgkQEBAPcBACGSAQEA9wEAIa0BAgCCAgAhvwEBAIACACHAAQIAggIAIcEBAQD3AQAhAgAAADcAIAgAAFsAIAaRAQEA9wEAIZIBAQD3AQAhrQECAIICACG_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-gEAILQBAAD6AQAgtQEAAPoBACC2AQAA-gEAILcBAAD6AQAguAEAAPoBACADAAAAgwEAIAMAAIQBADAEAACAAQAgAwAAAIMBACADAACEAQAwBAAAgAEAIAMAAACDAQAgAwAAhAEAMAQAAIABACAKkQEBAAAAAaYBAQAAAAGtAQIAAAABsgEBAAAAAbMBAQAAAAG0AQEAAAABtQEBAAAAAbYBAQAAAAG3AQEAAAABuAEBAAAAAQEIAACIAQAgCpEBAQAAAAGmAQEAAAABrQECAAAAAbIBAQAAAAGzAQEAAAABtAEBAAAAAbUBAQAAAAG2AQEAAAABtwEBAAAAAbgBAQAAAAEBCAAAigEAMAEIAACKAQAwCpEBAQD3AQAhpgEBAIACACGtAQIAggIAIbIBAQD3AQAhswEBAPcBACG0AQEAgAIAIbUBAQCAAgAhtgEBAIACACG3AQEAgAIAIbgBAQCAAgAhAgAAAIABACAIAACNAQAgCpEBAQD3AQAhpgEBAIACACGtAQIAggIAIbIBAQD3AQAhswEBAPcBACG0AQEAgAIAIbUBAQCAAgAhtgEBAIACACG3AQEAgAIAIbgBAQCAAgAhAgAAAIMBACAIAACPAQAgAgAAAIMBACAIAACPAQAgAwAAAIABACAPAACIAQAgEAAAjQEAIAEAAACAAQAgAQAAAIMBACALFQAAhAIAIBYAAIUCACAXAACIAgAgGAAAhwIAIBkAAIYCACCmAQAA-gEAILQBAAD6AQAgtQEAAPoBACC2AQAA-gEAILcBAAD6AQAguAEAAPoBACANjgEAAOYBADCPAQAAlgEAEJABAADmAQAwkQEBAMwBACGmAQEA2wEAIa0BAgDdAQAhsgEBAMwBACGzAQEAzAEAIbQBAQDbAQAhtQEBANsBACG2AQEA2wEAIbcBAQDbAQAhuAEBANsBACEDAAAAgwEAIAMAAJUBADAUAACWAQAgAwAAAIMBACADAACEAQAwBAAAgAEAIBMsAQDkAQAhjgEAAOMBADCPAQAAnAEAEJABAADjAQAwkQEBAAAAAZYBQADZAQAhogEBAAAAAaMBAQDXAQAhpAEBANcBACGlAQEA5AEAIaYBAQDXAQAhpwEAANwBACCoAQEA5AEAIakBAQDkAQAhqgEBANcBACGrAQEA1wEAIawBIADYAQAhrQECAOUBACGuAUAA2QEAIQEAAACZAQAgAQAAAJkBACATLAEA5AEAIY4BAADjAQAwjwEAAJwBABCQAQAA4wEAMJEBAQDXAQAhlgFAANkBACGiAQEA1wEAIaMBAQDXAQAhpAEBANcBACGlAQEA5AEAIaYBAQDXAQAhpwEAANwBACCoAQEA5AEAIakBAQDkAQAhqgEBANcBACGrAQEA1wEAIawBIADYAQAhrQECAOUBACGuAUAA2QEAIQQsAAD6AQAgpQEAAPoBACCoAQAA-gEAIKkBAAD6AQAgAwAAAJwBACADAACdAQAwBAAAmQEAIAMAAACcAQAgAwAAnQEAMAQAAJkBACADAAAAnAEAIAMAAJ0BADAEAACZAQAgECwBAAAAAZEBAQAAAAGWAUAAAAABogEBAAAAAaMBAQAAAAGkAQEAAAABpQEBAAAAAaYBAQAAAAGnAQAAgwIAIKgBAQAAAAGpAQEAAAABqgEBAAAAAasBAQAAAAGsASAAAAABrQECAAAAAa4BQAAAAAEBCAAAoQEAIBAsAQAAAAGRAQEAAAABlgFAAAAAAaIBAQAAAAGjAQEAAAABpAEBAAAAAaUBAQAAAAGmAQEAAAABpwEAAIMCACCoAQEAAAABqQEBAAAAAaoBAQAAAAGrAQEAAAABrAEgAAAAAa0BAgAAAAGuAUAAAAABAQgAAKMBADABCAAAowEAMBAsAQCAAgAhkQEBAPcBACGWAUAA-QEAIaIBAQD3AQAhowEBAPcBACGkAQEA9wEAIaUBAQCAAgAhpgEBAPcBACGnAQAAgQIAIKgBAQCAAgAhqQEBAIACACGqAQEA9wEAIasBAQD3AQAhrAEgAPgBACGtAQIAggIAIa4BQAD5AQAhAgAAAJkBACAIAACmAQAgECwBAIACACGRAQEA9wEAIZYBQAD5AQAhogEBAPcBACGjAQEA9wEAIaQBAQD3AQAhpQEBAIACACGmAQEA9wEAIacBAACBAgAgqAEBAIACACGpAQEAgAIAIaoBAQD3AQAhqwEBAPcBACGsASAA-AEAIa0BAgCCAgAhrgFAAPkBACECAAAAnAEAIAgAAKgBACACAAAAnAEAIAgAAKgBACADAAAAmQEAIA8AAKEBACAQAACmAQAgAQAAAJkBACABAAAAnAEAIAkVAAD7AQAgFgAA_AEAIBcAAP8BACAYAAD-AQAgGQAA_QEAICwAAPoBACClAQAA-gEAIKgBAAD6AQAgqQEAAPoBACATLAEA2wEAIY4BAADaAQAwjwEAAK8BABCQAQAA2gEAMJEBAQDMAQAhlgFAAM4BACGiAQEAzAEAIaMBAQDMAQAhpAEBAMwBACGlAQEA2wEAIaYBAQDMAQAhpwEAANwBACCoAQEA2wEAIakBAQDbAQAhqgEBAMwBACGrAQEAzAEAIawBIADNAQAhrQECAN0BACGuAUAAzgEAIQMAAACcAQAgAwAArgEAMBQAAK8BACADAAAAnAEAIAMAAJ0BADAEAACZAQAgCY4BAADWAQAwjwEAALUBABCQAQAA1gEAMJEBAQAAAAGSAQEA1wEAIZMBAQDXAQAhlAEBANcBACGVASAA2AEAIZYBQADZAQAhAQAAALIBACABAAAAsgEAIAmOAQAA1gEAMI8BAAC1AQAQkAEAANYBADCRAQEA1wEAIZIBAQDXAQAhkwEBANcBACGUAQEA1wEAIZUBIADYAQAhlgFAANkBACEAAwAAALUBACADAAC2AQAwBAAAsgEAIAMAAAC1AQAgAwAAtgEAMAQAALIBACADAAAAtQEAIAMAALYBADAEAACyAQAgBpEBAQAAAAGSAQEAAAABkwEBAAAAAZQBAQAAAAGVASAAAAABlgFAAAAAAQEIAAC6AQAgBpEBAQAAAAGSAQEAAAABkwEBAAAAAZQBAQAAAAGVASAAAAABlgFAAAAAAQEIAAC8AQAwAQgAALwBADAGkQEBAPcBACGSAQEA9wEAIZMBAQD3AQAhlAEBAPcBACGVASAA-AEAIZYBQAD5AQAhAgAAALIBACAIAAC_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_AQEA2wEAIcABAgDdAQAhwQEBAMwBACEGjgEAAOsBADCPAQAATgAQkAEAAOsBADCRAQEAzAEAIZIBAQDMAQAhrQECAN0BACEHLQAA7QEAII4BAADsAQAwjwEAADsAEJABAADsAQAwkQEBANcBACGSAQEA1wEAIa0BAgDlAQAhA8IBAAA1ACDDAQAANQAgxAEAADUAIAosAADvAQAgjgEAAO4BADCPAQAANQAQkAEAAO4BADCRAQEA1wEAIZIBAQDXAQAhrQECAOUBACG_AQEA5AEAIcABAgDlAQAhwQEBANcBACEJLQAA7QEAII4BAADsAQAwjwEAADsAEJABAADsAQAwkQEBANcBACGSAQEA1wEAIa0BAgDlAQAh1AEAADsAINUBAAA7ACAIjgEAAPABADCPAQAAMAAQkAEAAPABADCRAQEAzAEAIa0BAgDdAQAhxQEBAMwBACHGAQEAzAEAIccBIADNAQAhCI4BAADxAQAwjwEAAB0AEJABAADxAQAwkQEBANcBACGtAQIA5QEAIcUBAQDXAQAhxgEBANcBACHHASAA2AEAIRWOAQAA8gEAMI8BAAAXABCQAQAA8gEAMJEBAgDdAQAhkgEBAMwBACGTAQEAzAEAIa4BQADOAQAhtAEBANsBACG9AQAA3AEAIMgBAQDbAQAhyQEBAMwBACHKASAAzQEAIcsBAQDMAQAhzAEBAMwBACHNAQEA2wEAIc4BAQDbAQAhzwEAANwBACDQAQEA2wEAIdEBAQDbAQAh0gEBANsBACHTAQEA2wEAIRWOAQAA8wEAMI8BAAAEABCQAQAA8wEAMJEBAgDlAQAhkgEBANcBACGTAQEA1wEAIa4BQADZAQAhtAEBAOQBACG9AQAA3AEAIMgBAQDkAQAhyQEBANcBACHKASAA2AEAIcsBAQDXAQAhzAEBANcBACHNAQEA5AEAIc4BAQDkAQAhzwEAANwBACDQAQEA5AEAIdEBAQDkAQAh0gEBAOQBACHTAQEA5AEAIQAAAAHZAQEAAAABAdkBIAAAAAEB2QFAAAAAAQAAAAAAAAHZAQEAAAABAtkBAQAAAATfAQEAAAAFBdkBAgAAAAHgAQIAAAAB4QECAAAAAeIBAgAAAAHjAQIAAAABAdkBAQAAAAQAAAAAAAAAAAAAAtkBAQAAAATfAQEAAAAFAtkBAQAAAATfAQEAAAAFAdkBAQAAAAQB2QEBAAAABAAAAAAABQ8AAL0CACAQAADAAgAg1gEAAL4CACDXAQAAvwIAINwBAAAzACADDwAAvQIAINYBAAC-AgAg3AEAADMAIAAAAAAACw8AAJ8CADAQAACkAgAw1gEAAKACADDXAQAAoQIAMNgBAACiAgAg2QEAAKMCADDaAQAAowIAMNsBAACjAgAw3AEAAKMCADDdAQAApQIAMN4BAACmAgAwBZEBAQAAAAGSAQEAAAABrQECAAAAAb8BAQAAAAHAAQIAAAABAgAAADcAIA8AAKoCACADAAAANwAgDwAAqgIAIBAAAKkCACABCAAAvAIAMAosAADvAQAgjgEAAO4BADCPAQAANQAQkAEAAO4BADCRAQEAAAABkgEBANcBACGtAQIA5QEAIb8BAQDkAQAhwAECAOUBACHBAQEA1wEAIQIAAAA3ACAIAACpAgAgAgAAAKcCACAIAACoAgAgCY4BAACmAgAwjwEAAKcCABCQAQAApgIAMJEBAQDXAQAhkgEBANcBACGtAQIA5QEAIb8BAQDkAQAhwAECAOUBACHBAQEA1wEAIQmOAQAApgIAMI8BAACnAgAQkAEAAKYCADCRAQEA1wEAIZIBAQDXAQAhrQECAOUBACG_AQEA5AEAIcABAgDlAQAhwQEBANcBACEFkQEBAPcBACGSAQEA9wEAIa0BAgCCAgAhvwEBAIACACHAAQIAggIAIQWRAQEA9wEAIZIBAQD3AQAhrQECAIICACG_AQEAgAIAIcABAgCCAgAhBZEBAQAAAAGSAQEAAAABrQECAAAAAb8BAQAAAAHAAQIAAAABBA8AAJ8CADDWAQAAoAIAMNgBAACiAgAg3AEAAKMCADAAAS0AAKwCACAAAAAAAAAAAAAAAtkBAQAAAATfAQEAAAAFAtkBAQAAAATfAQEAAAAFAdkBAQAAAAQB2QEBAAAABAWRAQEAAAABkgEBAAAAAa0BAgAAAAG_AQEAAAABwAECAAAAAQORAQEAAAABkgEBAAAAAa0BAgAAAAECAAAAMwAgDwAAvQIAIAMAAAA7ACAPAAC9AgAgEAAAwQIAIAUAAAA7ACAIAADBAgAgkQEBAPcBACGSAQEA9wEAIa0BAgCCAgAhA5EBAQD3AQAhkgEBAPcBACGtAQIAggIAIQAAAAAFFQAGFgAHFwAIGAAJGQAKAAAAAAAFFQAGFgAHFwAIGAAJGQAKAAAABRUAEBYAERcAEhgAExkAFAAAAAAABRUAEBYAERcAEhgAExkAFAIVABgtOBcBLAAWAS05AAAABRUAHBYAHRcAHhgAHxkAIAAAAAAABRUAHBYAHRcAHhgAHxkAIAEsABYBLAAWBRUAJRYAJhcAJxgAKBkAKQAAAAAABRUAJRYAJhcAJxgAKBkAKQAAAAUVAC8WADAXADEYADIZADMAAAAAAAUVAC8WADAXADEYADIZADMAAAAFFQA5FgA6FwA7GAA8GQA9AAAAAAAFFQA5FgA6FwA7GAA8GQA9AAAABRUAQxYARBcARRgARhkARwAAAAAABRUAQxYARBcARRgARhkARwAAAAMVAE0YAE4ZAE8AAAADFQBNGABOGQBPAQIBAgMBBQYBBgcBBwgBCQoBCgwCCw0DDA8BDRECDhIEERMBEhQBExUCGhgFGxkLHBsMHRwMHh8MHyAMICEMISMMIiUCIyYNJCgMJSoCJisOJywMKC0MKS4CKjEPKzIVLjQWLzoWMD0WMT4WMj8WM0EWNEMCNUQZNkYWN0gCOEkaOUoWOksWO0wCPE8bPVAhPlEXP1IXQFMXQVQXQlUXQ1cXRFkCRVoiRlwXR14CSF8jSWAXSmEXS2ICTGUkTWYqTmgrT2krUGwrUW0rUm4rU3ArVHICVXMsVnUrV3cCWHgtWXkrWnorW3sCXH4uXX80XoEBNV-CATVghQE1YYYBNWKHATVjiQE1ZIsBAmWMATZmjgE1Z5ABAmiRATdpkgE1apMBNWuUAQJslwE4bZgBPm6aAT9vmwE_cJ4BP3GfAT9yoAE_c6IBP3SkAQJ1pQFAdqcBP3epAQJ4qgFBeasBP3qsAT97rQECfLABQn2xAUh-swFJf7QBSYABtwFJgQG4AUmCAbkBSYMBuwFJhAG9AQKFAb4BSoYBwAFJhwHCAQKIAcMBS4kBxAFJigHFAUmLAcYBAowByQFMjQHKAVA"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AnyNull: () => AnyNull2,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  EducationScalarFieldEnum: () => EducationScalarFieldEnum,
  ExperienceScalarFieldEnum: () => ExperienceScalarFieldEnum,
  JsonNull: () => JsonNull2,
  MessageScalarFieldEnum: () => MessageScalarFieldEnum,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  ProfileScalarFieldEnum: () => ProfileScalarFieldEnum,
  ProjectScalarFieldEnum: () => ProjectScalarFieldEnum,
  QueryMode: () => QueryMode,
  SkillCategoryScalarFieldEnum: () => SkillCategoryScalarFieldEnum,
  SkillScalarFieldEnum: () => SkillScalarFieldEnum,
  SocialLinkScalarFieldEnum: () => SocialLinkScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.10.0",
  engine: "0edf323efd1d98336f3f0a68684b56f689b900d3"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  Profile: "Profile",
  SocialLink: "SocialLink",
  SkillCategory: "SkillCategory",
  Skill: "Skill",
  Experience: "Experience",
  Education: "Education",
  Project: "Project",
  Message: "Message"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var ProfileScalarFieldEnum = {
  id: "id",
  name: "name",
  alias: "alias",
  designation: "designation",
  location: "location",
  isAvailable: "isAvailable",
  availabilityText: "availabilityText",
  heroIntro: "heroIntro",
  photoUrl: "photoUrl",
  resumeUrl: "resumeUrl",
  aboutParagraphs: "aboutParagraphs",
  highlights: "highlights",
  email: "email",
  phone: "phone",
  whatsapp: "whatsapp",
  contactBlurb: "contactBlurb",
  footerText: "footerText",
  updatedAt: "updatedAt"
};
var SocialLinkScalarFieldEnum = {
  id: "id",
  label: "label",
  url: "url",
  showInHero: "showInHero",
  order: "order"
};
var SkillCategoryScalarFieldEnum = {
  id: "id",
  name: "name",
  order: "order"
};
var SkillScalarFieldEnum = {
  id: "id",
  name: "name",
  icon: "icon",
  level: "level",
  order: "order",
  categoryId: "categoryId"
};
var ExperienceScalarFieldEnum = {
  id: "id",
  role: "role",
  company: "company",
  companyUrl: "companyUrl",
  location: "location",
  employment: "employment",
  startDate: "startDate",
  endDate: "endDate",
  description: "description",
  highlights: "highlights",
  technologies: "technologies",
  order: "order"
};
var EducationScalarFieldEnum = {
  id: "id",
  degree: "degree",
  institution: "institution",
  location: "location",
  startDate: "startDate",
  endDate: "endDate",
  result: "result",
  description: "description",
  coursework: "coursework",
  order: "order"
};
var ProjectScalarFieldEnum = {
  id: "id",
  slug: "slug",
  title: "title",
  category: "category",
  summary: "summary",
  imageUrl: "imageUrl",
  description: "description",
  techStack: "techStack",
  liveUrl: "liveUrl",
  repoUrl: "repoUrl",
  challenges: "challenges",
  improvements: "improvements",
  featured: "featured",
  order: "order",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var MessageScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  body: "body",
  read: "read",
  createdAt: "createdAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/env.ts
import "dotenv/config";
import { z } from "zod";
var EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("production"),
  PORT: z.coerce.number().default(5e3),
  DATABASE_URL: z.string().default(
    "postgres://ff20ddc91179f2ecb10b232e608bb7d628069a1f20667e6cbc319c72114664ea:sk_1mfZTJhI_sT70_Jh8l6Ua@pooled.db.prisma.io:5432/postgres?sslmode=require"
  ),
  JWT_SECRET: z.string().default(
    "6a3dd9a72f3292b54c6d724d90815831702b5b01a5bf3398cbd2efa98f9d8547df318d184d1498db760c28b02c15dc4f"
  ),
  JWT_EXPIRES_IN: z.string().default("7d"),
  ADMIN_EMAIL: z.string().default("asifshahriartauhid@gmail.com"),
  ADMIN_PASSWORD: z.string().default("change-me-please"),
  /** Comma-separated list of allowed origins, e.g. http://localhost:3000 */
  CORS_ORIGIN: z.string().default("https://asiftauhid.me,https://www.asiftauhid.me,http://localhost:3000")
});
var parsed = EnvSchema.safeParse(process.env);
if (!parsed.success) {
  console.warn("\u26A0\uFE0F Warning: Environment variable validation issues (using fallbacks):");
  for (const issue of parsed.error.issues) {
    console.warn(`   \u2022 ${issue.path.join(".")}: ${issue.message}`);
  }
}
var env = parsed.success ? parsed.data : {
  NODE_ENV: process.env.NODE_ENV || "production",
  PORT: Number(process.env.PORT) || 5e3,
  DATABASE_URL: process.env.DATABASE_URL || "postgres://ff20ddc91179f2ecb10b232e608bb7d628069a1f20667e6cbc319c72114664ea:sk_1mfZTJhI_sT70_Jh8l6Ua@pooled.db.prisma.io:5432/postgres?sslmode=require",
  JWT_SECRET: process.env.JWT_SECRET || "6a3dd9a72f3292b54c6d724d90815831702b5b01a5bf3398cbd2efa98f9d8547df318d184d1498db760c28b02c15dc4f",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "asifshahriartauhid@gmail.com",
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "change-me-please",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "https://asiftauhid.me,https://www.asiftauhid.me,http://localhost:3000"
};

// src/db.ts
var adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
var globalForPrisma = globalThis;
var prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });
if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// src/routes.ts
import { Router as Router2 } from "express";
import { z as z3 } from "zod";

// src/auth.ts
import { createHash, timingSafeEqual } from "crypto";
import jwt from "jsonwebtoken";
function safeEqual(a, b) {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}
function verifyCredentials(email, password) {
  const emailOk = safeEqual(email.trim().toLowerCase(), env.ADMIN_EMAIL.toLowerCase());
  const passOk = safeEqual(password, env.ADMIN_PASSWORD);
  return emailOk && passOk;
}
function signToken(email) {
  const claims = { sub: email, role: "admin" };
  return jwt.sign(claims, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN
  });
}
function requireAdmin(req, res, next) {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Authentication required" });
  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    if (payload.role !== "admin") throw new Error("Invalid role");
    res.locals.admin = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// src/crud.ts
import { Router } from "express";
var wrap = (fn) => (req, res, next) => fn(req, res, next).catch(next);
function crudRouter({ delegate, schema, orderBy = { order: "asc" }, include }) {
  const router = Router();
  router.get(
    "/",
    wrap(async (_req, res) => {
      res.json(await delegate.findMany({ orderBy, include }));
    })
  );
  router.get(
    "/:id",
    wrap(async (req, res) => {
      const item = await delegate.findUnique({ where: { id: req.params.id }, include });
      if (!item) return res.status(404).json({ error: "Not found" });
      res.json(item);
    })
  );
  router.post(
    "/",
    requireAdmin,
    wrap(async (req, res) => {
      const data = schema.parse(req.body);
      res.status(201).json(await delegate.create({ data }));
    })
  );
  router.put(
    "/:id",
    requireAdmin,
    wrap(async (req, res) => {
      const data = schema.parse(req.body);
      res.json(await delegate.update({ where: { id: req.params.id }, data }));
    })
  );
  router.delete(
    "/:id",
    requireAdmin,
    wrap(async (req, res) => {
      await delegate.delete({ where: { id: req.params.id } });
      res.status(204).end();
    })
  );
  return router;
}

// src/schemas.ts
import { z as z2 } from "zod";
var optionalText = z2.string().trim().transform((v) => v === "" ? null : v).nullish();
var optionalUrl = z2.string().trim().refine((v) => v === "" || /^(https?:\/\/|mailto:|tel:|\/)/i.test(v), "Must be a valid URL").transform((v) => v === "" ? null : v).nullish();
var requiredText = z2.string().trim().min(1, "Required");
var stringList = z2.array(z2.string().trim()).transform((list) => list.filter(Boolean)).default([]);
var order = z2.coerce.number().int().default(0);
var profileSchema = z2.object({
  name: requiredText,
  alias: optionalText,
  designation: requiredText,
  location: optionalText,
  isAvailable: z2.boolean().default(true),
  availabilityText: z2.string().trim().default("Available for work"),
  heroIntro: requiredText,
  photoUrl: optionalUrl,
  resumeUrl: optionalUrl,
  aboutParagraphs: stringList,
  highlights: stringList,
  email: z2.email(),
  phone: optionalText,
  whatsapp: optionalText,
  contactBlurb: optionalText,
  footerText: optionalText
});
var socialLinkSchema = z2.object({
  label: requiredText,
  url: z2.string().trim().regex(/^(https?:\/\/|mailto:|tel:)/i, "Must start with https://, mailto: or tel:"),
  showInHero: z2.boolean().default(true),
  order
});
var skillCategorySchema = z2.object({
  name: requiredText,
  order
});
var skillSchema = z2.object({
  name: requiredText,
  icon: optionalText,
  level: z2.coerce.number().int().min(0).max(100).default(70),
  categoryId: requiredText,
  order
});
var experienceSchema = z2.object({
  role: requiredText,
  company: requiredText,
  companyUrl: optionalUrl,
  location: optionalText,
  employment: optionalText,
  startDate: requiredText,
  endDate: optionalText,
  description: optionalText,
  highlights: stringList,
  technologies: stringList,
  order
});
var educationSchema = z2.object({
  degree: requiredText,
  institution: requiredText,
  location: optionalText,
  startDate: optionalText,
  endDate: optionalText,
  result: optionalText,
  description: optionalText,
  coursework: optionalText,
  order
});
var projectSchema = z2.object({
  slug: z2.string().trim().toLowerCase().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and dashes"),
  title: requiredText,
  category: optionalText,
  summary: requiredText,
  imageUrl: optionalUrl,
  description: requiredText,
  techStack: stringList,
  liveUrl: optionalUrl,
  repoUrl: optionalUrl,
  challenges: requiredText,
  improvements: requiredText,
  featured: z2.boolean().default(true),
  order
});
var featuredProjectsSchema = z2.object({
  projectIds: z2.array(z2.string().min(1)).max(3, "You can select at most 3 featured projects")
});
var messageSchema = z2.object({
  name: z2.string().trim().min(1, "Name is required").max(120),
  email: z2.email("Enter a valid email"),
  body: z2.string().trim().min(5, "Message is too short").max(5e3)
});
var messageUpdateSchema = z2.object({ read: z2.boolean() });
var loginSchema = z2.object({
  email: z2.string().min(1),
  password: z2.string().min(1)
});

// src/routes.ts
var api = Router2();
api.post(
  "/auth/login",
  wrap(async (req, res) => {
    const { email, password } = loginSchema.parse(req.body);
    if (!verifyCredentials(email, password)) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    res.json({ token: signToken(email) });
  })
);
api.get("/auth/me", requireAdmin, (_req, res) => {
  res.json({ email: res.locals.admin.sub });
});
api.get(
  "/portfolio",
  wrap(async (_req, res) => {
    const [profile, socialLinks, skillCategories, experiences, education, projects] = await Promise.all([
      prisma.profile.findUnique({ where: { id: 1 } }),
      prisma.socialLink.findMany({ orderBy: { order: "asc" } }),
      prisma.skillCategory.findMany({
        orderBy: { order: "asc" },
        include: { skills: { orderBy: { order: "asc" } } }
      }),
      prisma.experience.findMany({ orderBy: { order: "asc" } }),
      prisma.education.findMany({ orderBy: { order: "asc" } }),
      prisma.project.findMany({ orderBy: { order: "asc" } })
    ]);
    res.json({ profile, socialLinks, skillCategories, experiences, education, projects });
  })
);
api.get(
  "/profile",
  wrap(async (_req, res) => {
    res.json(await prisma.profile.findUnique({ where: { id: 1 } }));
  })
);
api.put(
  "/profile",
  requireAdmin,
  wrap(async (req, res) => {
    const data = profileSchema.parse(req.body);
    res.json(
      await prisma.profile.upsert({
        where: { id: 1 },
        create: { id: 1, ...data },
        update: data
      })
    );
  })
);
api.get(
  "/projects/slug/:slug",
  wrap(async (req, res) => {
    const project = await prisma.project.findUnique({ where: { slug: req.params.slug } });
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  })
);
api.put(
  "/projects/featured",
  requireAdmin,
  wrap(async (req, res) => {
    const { projectIds } = featuredProjectsSchema.parse(req.body);
    await prisma.$transaction(async (tx) => {
      await tx.project.updateMany({
        where: { id: { notIn: projectIds } },
        data: { featured: false }
      });
      const now = Date.now();
      for (let i = 0; i < projectIds.length; i++) {
        await tx.project.update({
          where: { id: projectIds[i] },
          data: {
            featured: true,
            order: i,
            updatedAt: new Date(now - i * 1e3)
          }
        });
      }
    });
    const updatedProjects = await prisma.project.findMany({
      orderBy: { order: "asc" }
    });
    res.json(updatedProjects);
  })
);
api.patch(
  "/projects/:id/featured",
  requireAdmin,
  wrap(async (req, res) => {
    const id = req.params.id;
    const { featured } = z3.object({ featured: z3.boolean() }).parse(req.body);
    if (featured) {
      const currentFeatured = await prisma.project.findMany({
        where: { featured: true, id: { not: id } },
        orderBy: { order: "asc" }
      });
      if (currentFeatured.length >= 3) {
        return res.status(400).json({
          error: "You can feature a maximum of 3 projects. Please unfeature a project first."
        });
      }
      await prisma.$transaction(async (tx) => {
        for (let i = 0; i < currentFeatured.length; i++) {
          await tx.project.update({
            where: { id: currentFeatured[i].id },
            data: { order: i + 1 }
          });
        }
        await tx.project.update({
          where: { id },
          data: {
            featured: true,
            order: 0,
            updatedAt: /* @__PURE__ */ new Date()
          }
        });
      });
    } else {
      await prisma.project.update({
        where: { id },
        data: { featured: false }
      });
    }
    const updated = await prisma.project.findUnique({ where: { id } });
    res.json(updated);
  })
);
api.use("/projects", crudRouter({ delegate: prisma.project, schema: projectSchema }));
api.use("/social-links", crudRouter({ delegate: prisma.socialLink, schema: socialLinkSchema }));
api.use(
  "/skill-categories",
  crudRouter({
    delegate: prisma.skillCategory,
    schema: skillCategorySchema,
    include: { skills: { orderBy: { order: "asc" } } }
  })
);
api.use("/skills", crudRouter({ delegate: prisma.skill, schema: skillSchema }));
api.use("/experiences", crudRouter({ delegate: prisma.experience, schema: experienceSchema }));
api.use("/education", crudRouter({ delegate: prisma.education, schema: educationSchema }));
api.post(
  "/messages",
  wrap(async (req, res) => {
    const data = messageSchema.parse(req.body);
    const message = await prisma.message.create({ data });
    res.status(201).json({ id: message.id });
  })
);
api.get(
  "/messages",
  requireAdmin,
  wrap(async (_req, res) => {
    res.json(await prisma.message.findMany({ orderBy: { createdAt: "desc" } }));
  })
);
api.patch(
  "/messages/:id",
  requireAdmin,
  wrap(async (req, res) => {
    const data = messageUpdateSchema.parse(req.body);
    res.json(await prisma.message.update({ where: { id: req.params.id }, data }));
  })
);
api.delete(
  "/messages/:id",
  requireAdmin,
  wrap(async (req, res) => {
    await prisma.message.delete({ where: { id: req.params.id } });
    res.status(204).end();
  })
);
api.get(
  "/stats",
  requireAdmin,
  wrap(async (_req, res) => {
    const [projects, skills, experiences, education, messages, unread] = await Promise.all([
      prisma.project.count(),
      prisma.skill.count(),
      prisma.experience.count(),
      prisma.education.count(),
      prisma.message.count(),
      prisma.message.count({ where: { read: false } })
    ]);
    res.json({ projects, skills, experiences, education, messages, unread });
  })
);

// src/index.ts
var app = express();
app.disable("x-powered-by");
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const allowed = env.CORS_ORIGIN.split(",").map((o) => o.trim().toLowerCase());
      const lowerOrigin = origin.toLowerCase();
      if (allowed.includes(lowerOrigin) || lowerOrigin === "https://asiftauhid.me" || lowerOrigin === "https://www.asiftauhid.me" || lowerOrigin.endsWith(".asiftauhid.me") || lowerOrigin.includes("localhost") || lowerOrigin.includes("127.0.0.1")) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));
app.get(
  "/",
  (_req, res) => res.json({ ok: true, message: "Portfolio API is active", docs: "/api/portfolio" })
);
app.get(
  "/api",
  (_req, res) => res.json({ ok: true, message: "Portfolio API is active", docs: "/api/portfolio" })
);
app.get("/health", (_req, res) => res.json({ ok: true }));
app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api", api);
app.use((_req, res) => res.status(404).json({ error: "Route not found" }));
app.use((err, _req, res, _next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Validation failed",
      issues: err.issues.map((i) => ({ path: i.path.join("."), message: i.message }))
    });
  }
  if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2025") return res.status(404).json({ error: "Record not found" });
    if (err.code === "P2002") return res.status(409).json({ error: "A record with that value already exists" });
    if (err.code === "P2003") return res.status(400).json({ error: "Related record does not exist" });
  }
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});
var index_default = app;
if (!process.env.VERCEL) {
  const server = app.listen(env.PORT, () => {
    console.log(`\u{1F680} API ready on http://localhost:${env.PORT}`);
  });
  async function shutdown() {
    server.close();
    await prisma.$disconnect();
    process.exit(0);
  }
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}
export {
  index_default as default
};
//# sourceMappingURL=index.js.map