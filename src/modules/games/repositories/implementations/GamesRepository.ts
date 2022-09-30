import { getRepository, Repository } from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";

import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const games: Game[] = await this.repository
      .createQueryBuilder("games")
      .select("title")
      .where("games.title ilike :title", { title: `%${param}%` })
      .getRawMany();

    if (!games) {
      throw new Error("No game match this search!");
    }

    return games;
    // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query("SELECT COUNT(*) FROM games"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const users: User[] = await this.repository
    .createQueryBuilder()
    .relation(Game, "users")
    .of(id)
    .loadMany();
    
    if(!users) {
      throw new Error("No user match this search")
    }

    return users
    
    // Complete usando query builder
  }
}
