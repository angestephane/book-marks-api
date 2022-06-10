import * as mongoose from 'mongoose';

export interface Bookmark {
  id: string;
  titre: string;
  lien: string;
  categories: string;
  description: {
    auteur: string;
    dateSortie: string;
    nbrPage: number;
    langue: string;
  };
}

export const BookmarkSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  lien: { type: String, required: true },
  categories: { type: String, required: true },
  description: {
    auteur: { type: String, required: true },
    dateSortie: Date,
    nbrPage: { type: Number, required: true },
    langue: { type: String, required: true },
  },
});
