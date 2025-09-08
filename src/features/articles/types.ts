import { articleStatusEnum } from "./schema";

export type ArticleStatusType = (typeof articleStatusEnum.enumValues)[number];
