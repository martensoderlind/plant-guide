import { relations } from "drizzle-orm/relations";
import { users, userRoles, roles, articles, articleTags, tags } from "./schema";

export const userRolesRelations = relations(userRoles, ({one}) => ({
	user: one(users, {
		fields: [userRoles.userId],
		references: [users.id]
	}),
	role: one(roles, {
		fields: [userRoles.roleId],
		references: [roles.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	userRoles: many(userRoles),
}));

export const rolesRelations = relations(roles, ({many}) => ({
	userRoles: many(userRoles),
}));

export const articleTagsRelations = relations(articleTags, ({one}) => ({
	article: one(articles, {
		fields: [articleTags.articleId],
		references: [articles.id]
	}),
	tag: one(tags, {
		fields: [articleTags.tagId],
		references: [tags.id]
	}),
}));

export const articlesRelations = relations(articles, ({many}) => ({
	articleTags: many(articleTags),
}));

export const tagsRelations = relations(tags, ({many}) => ({
	articleTags: many(articleTags),
}));