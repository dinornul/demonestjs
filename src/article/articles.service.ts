import { Injectable, NotFoundException } from '@nestjs/common';

import { Article } from './articles.model';

@Injectable()
export class articlesService {
  private articles: Article[] = [];

  insertarticle(title: string, desc: string, price: number) {
    const prodId = Math.random().toString();
    const newarticle = new Article(prodId, title, desc, price);
    this.articles.push(newarticle);
    return prodId;
  }

  getarticles() {
    return [...this.articles];
  }

  getSinglearticle(articleId: string) {
    const article = this.findarticle(articleId)[0];
    return { ...article };
  }

  updatearticle(articleId: string, title: string, desc: string, price: number) {
    const [article, index] = this.findarticle(articleId);
    const updatedarticle = { ...article };
    if (title) {
      updatedarticle.title = title;
    }
    if (desc) {
      updatedarticle.description = desc;
    }
    if (price) {
      updatedarticle.price = price;
    }
    this.articles[index] = updatedarticle;
  }

  deletearticle(prodId: string) {
      const index = this.findarticle(prodId)[1];
      this.articles.splice(index, 1);
  }

  private findarticle(id: string): [Article, number] {
    const articleIndex = this.articles.findIndex(prod => prod.id === id);
    const article = this.articles[articleIndex];
    if (!article) {
      throw new NotFoundException('Could not find article.');
    }
    return [article, articleIndex];
  }
}
