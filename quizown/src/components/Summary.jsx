import quizCompleteImg from "../assets/quiz-complete.png"
import QUESTIONS from "../questions"

export default function Summary({ userAnswers }){

    const skippedAnswers = userAnswers.filter(answer => answer === null)
    const correctAnswers = userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0])

    const skippedAnswersShare = Math.round((skippedAnswers.length / userAnswers.length) * 100)
    const correctAnswersShare = Math.round((correctAnswers.length / userAnswers.length) * 100)

    const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare

    return (
        <div id="summary">
            <img src={quizCompleteImg} alt="Icon de Troféu" />
            <h2>Quiz completado!</h2>
            <div id="summary-stats">
                <p>
                    <span className="number">{skippedAnswersShare}%</span>
                    <span className="text">puladas</span>
                </p>
                <p>
                    <span className="number">{correctAnswersShare}%</span>
                    <span className="text">respondidas corretamente</span>
                </p>
                <p>
                    <span className="number">{wrongAnswersShare}%</span>
                    <span className="text">respondidas incorretamente</span>
                </p>
            </div>
            <ol>
                {userAnswers.map((answer, index) => {
                    let cssClass = 'user-answer'

                    if (answer === null){
                        cssClass += ' skipped'
                    } else if (answer === QUESTIONS[index].answers[0]){
                        cssClass += ' correct'
                    } else {
                        cssClass += ' wrong'
                    }

                    return (
                        <li key={index}>
                            <h3>{index + 1}</h3>
                            <p className="question">{QUESTIONS[index].text}</p>
                            <p className={cssClass}>{answer ?? 'Pulada'}</p>
                        </li>
                    )
                })}
            </ol>
        </div>
    )

}