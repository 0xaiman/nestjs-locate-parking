import { Injectable } from '@nestjs/common';

@Injectable()
export class SongService {
  //local db
  //local array

  private readonly songs = [];

  create(song) {
    this.songs.push(song);
  }

  findAll() {
    return this.songs;
  }
}
