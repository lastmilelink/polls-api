import * as Joi from 'joi';
const data = require('../data.json');

export interface Answer {
  id: string;
  answer: string;
  votes: number;
}

export const answerSchema = Joi.object().keys({
  answer: Joi.string()
}).requiredKeys('answer');

export const answersSchema = Joi.array().items(answerSchema);

export interface Poll {
  id: string;
  title: string;
  answer: Answer[];
}

export const pollSchema = Joi.object().keys({
  title: Joi.string(),
  answer: Joi.array().items(answerSchema)
}).requiredKeys('title');

export interface Idb {
  [uuid: string]: Poll
}

export class DB {
  private data: Idb = JSON.parse(JSON.stringify(data));

  reset() {
    this.data = JSON.parse(JSON.stringify(data));
    return this;
  }

  get() {
    return this.data;
  }

  getPoll(id: string) {
    return this.data[id];
  }

  setPoll(id: string, poll: Poll) {
    this.data[id] = poll;
    return this.data[id];
  }
}
