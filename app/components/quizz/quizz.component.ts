import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit  } from '@angular/core';
import quizz_questions from '../../assets/data/quizz.json'
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class QuizzComponent implements OnInit {
  
  title: string ="";
  questions: any;
  questionSelected: any;
  answers: string[] = [];
  answerSelected: string ="";
  questionIndex:number= 0;
  questionMaxIndex:number = 0;
  finished: boolean = false

  constructor() {}
  ngOnInit(): void {
    if(quizz_questions) {
      this.finished = false
      this.title = quizz_questions.title;
      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]
      this.questionIndex=0
      this.questionMaxIndex= this.questions.length
    }
  }

  playerChoose(value:string) {
    this.answers.push(value)
    this.nextStep()
    console.log(this.answers)
  }

  async nextStep() {
    this.questionIndex +=1

    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    }else {
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
      console.log(this.answers)
    }

  }
  async checkResult(answers: any[]){
    let result = answers.reduce((previews, current, i, arr) => {
      if(
        arr.filter(item => item === previews).length > arr.filter(item => item === current).length){
        return previews
      }else {
        return current
      }
    })
   return result
  }
  getColorClass() {
    switch(this.answerSelected) {
      case 'Corvinal!' : return 'color-blue';
      case 'Sonserina!' : return 'color-green';
      case 'Lufa-Lufa!' : return 'color-yellow';
      case 'Grifinória!' : return 'color-red';
      default: return '';
    }

  }
  

}
