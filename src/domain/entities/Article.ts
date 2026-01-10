import { ArticleStatus } from "@prisma/client";
import { User } from "./User";

export class Article {
  constructor(
    public id: string,
    public authorId: string,
    public title: string,
    public subTitle: string,
    public slug: string,
    public excerpt: string,
    public heroImage: string | null,
    public author: User,
    public contentHtml: string,
    public references: string | null,
    public status: ArticleStatus,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
