import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, Input } from '@angular/core';
import { empty } from 'rxjs';

export interface table {
  row: number;
  colum: number;
  player: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  table;
  players: string = "O";
  row;
  column;
  numOfinput: number;
  winerOfO: number = 0;
  winerOfX: number = 0;
  winerOfcolX: number = 0;
  winerOfcolO: number = 0;
  count: number = 0;
  countO: number = 0;
  playerWinner:string;
  arr = [];

  constructor() {

  }

  public create(inPut: number) {
    this.numOfinput = inPut;
    const t = new Array(inPut * 1);
    this.table = t;
    this.getArray(inPut);
  }

  swiplayer(r, c) {
    this.row = r;
    this.column = c;
    this.players == "X" ? this.players = "O" : this.players = "X"


  }
  getArray(inPut) {
    for (let i = 0; i < inPut; i++) {
      this.arr[i] = [];
      for (let j = 0; j < inPut; j++)
        this.arr[i][j] = 0;
    }
  }
  check(i, j) {
    if (i === this.row && j === this.column) {
      if (this.players === "X") {
        this.arr[i][j] = 1;
        return this.chrckinArray(i, j);
      }
      else if (this.players === "O") {
        this.arr[i][j] = 2;
        return this.chrckinArray(i, j);
      }
    }
    else {
      // this.winner();
      if (this.checkWinner() == 1) {
        this.playerWinner = "X win"
      }
      if (this.checkWinner() == 2) {
        this.playerWinner="O win"
      }
      return this.chrckinArray(i, j);
    }

  }
  chrckinArray(row, col) {
    if (this.arr[row][col] == 0) {
      return ""
    }
    else if (this.arr[row][col] == 1) {
      return "X"
    }
    else if (this.arr[row][col] == 2) {
      return "O"
    }

  }
  winner() {


    for (let i = 0; i < this.numOfinput; i++) {
      for (let j = 0; j < this.numOfinput; j++) {

        if (this.arr[i][j] != 0) {
          this.arr[i][j] == 1 ? this.winerOfX++ : this.winerOfX = 0;
          this.arr[i][j] == 2 ? this.winerOfO++ : this.winerOfO = 0;
          if (this.winerOfX == 3) {
            console.log("Win X");
          }
          else if (this.winerOfO == 3) {
            console.log("Win O");
          }
        }
        if (this.arr[j][i] != 0) {
          this.arr[j][i] == 2 ? this.winerOfcolO++ : this.winerOfcolO = 0;
          this.arr[j][i] == 1 ? this.winerOfcolX++ : this.winerOfcolX = 0;
          if (this.winerOfcolO == 3) {
            console.log("Win col O");
          }
          else if (this.winerOfcolX == 3) {
            console.log("Win col X");
          }
        }
        if (this.arr[i][j] != 0) {
          if (this.arr[i][j] == 1) {
            for (let k = 1; k < this.numOfinput; k++) {
              if (i + k < this.arr.length && j + k < this.arr.length) {
                this.arr[i + k][j + k] == 1 ? this.count++ : this.count = 0;
              }
              if (this.count === 2) console.log("Work X")
            }
            this.count = 0;
          }
          else {
            for (let k = 1; k < this.numOfinput; k++) {
              if (i + k < this.arr.length && j + k < this.arr.length) {
                this.arr[i + k][j + k] == 2 ? this.count++ : this.count = 0;
              }
              if (this.count === 2) console.log("Work O")
            }
            this.count = 0;
          }
        }
      }
      this.winerOfX = 0;
      this.winerOfO = 0;
      this.winerOfcolX = 0;
      this.winerOfcolO = 0;

    }

  }
  public checkWinner() {
    const p1 = this.isWon(1);
    if (p1) return 1;

    const p2 = this.isWon(2);
    if (p2) return 2;

    return 0;
  }
  public isWon(player: number) {
    return this.checkHorizontals(player) || this.checkVerticals(player) || this.checkCross(player);
  }

  public checkHorizontals(player: number) {
    for (let row = 0; row < this.numOfinput; row++) {
      if (this.checkHorizontal(player, row))
        return true;
    }
    return false;
  }

  public checkHorizontal(player: number, row: number) {
    for (let col = 0; col < this.numOfinput; col++) {
      if (this.arr[row][col] !== player)
        return false;
    }
    return true;
  }

  public checkVerticals(player: number) {
    for (let col = 0; col < this.numOfinput; col++) {
      if (this.checkVertical(player, col))
        return true;
    }
    return false;
  }

  public checkVertical(player: number, col: number) {
    for (let row = 0; row < this.numOfinput; row++) {
      if (this.arr[row][col] !== player)
        return false;
    }
    return true;
  }

  public checkCross(player: number) {
    return this.checkTopLeftBottomRight(player) || this.checkTopRightBottomLeft(player);
  }

  public checkTopLeftBottomRight(player: number) {
    for (let i = 0; i < this.numOfinput; i++) {
      if (this.arr[i][i] !== player)
        return false;
    }
    return true;
  }

  public checkTopRightBottomLeft(player: number) {
    for (let i = 0; i < this.numOfinput; i++) {
      let j = this.numOfinput - 1 - i;
      if (this.arr[i][j] !== player)
        return false;
    }
    return true;
  }

}
