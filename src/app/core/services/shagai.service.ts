import { Injectable } from '@angular/core';
import { KnuckleBone } from 'src/app/shared/models/knuckleBone';
import { Shagai } from 'src/app/shared/models/shagai';
import { CountBones } from 'src/app/shared/models/count-bones';
import { PositionEnum } from 'src/app/shared/enum/position.enum';
import { AnswerText } from 'src/app/shared/enum/answer-text.enum';
import { AnswerMap } from 'src/app/shared/enum/answer-map.enum';

@Injectable({
  providedIn: 'root'
})
export class ShagaiService {
  constructor() {}

  public newGame(): Shagai {
    const newGame: Shagai = {
      Result: [],
      Answer: null
    };

    newGame.Result = this.generateKnuckleBones();
    newGame.Answer = this.giveAnswer(newGame.Result);
    return newGame;
  }

  private generateKnuckleBones(): KnuckleBone[] {
    const bones: KnuckleBone[] = [];
    // Randomizes 4 knuckle bones
    for (let i = 0; i < 4; i++) {
      const random = Math.round(Math.random() * 3) + 1;
      const knuckleBone = new KnuckleBone();
      knuckleBone.Position = random;
      bones.push(knuckleBone);
    }
    return bones;
  }

  private giveAnswer(result: KnuckleBone[]) {
    const countBones = this.countBones(result);
    return this.interpreteCount(countBones);
  }

  private countBones(results: KnuckleBone[]): CountBones {
    const count: CountBones = {
      NumberHorses: 0,
      NumberCamels: 0,
      NumberSheeps: 0,
      NumberGoats: 0
    };

    results.forEach(r => {
      switch (r.Position) {
        case PositionEnum.Horse:
          count.NumberHorses++;
          break;
        case PositionEnum.Camel:
          count.NumberCamels++;
          break;
        case PositionEnum.Sheep:
          count.NumberSheeps++;
          break;
        case PositionEnum.Goat:
          count.NumberGoats++;
          break;
      }
    });

    return count;
  }

  private interpreteCount(countBones: CountBones): AnswerText {
    const result = countBones.NumberHorses * 64 + countBones.NumberCamels * 16 + countBones.NumberSheeps * 4 + countBones.NumberGoats;
    return AnswerText[AnswerMap[result]];
  }
}
