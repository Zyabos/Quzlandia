import {useState, useEffect} from "react"
import {nanoid} from 'nanoid'
import parse from 'html-react-parser';
import FirstPage from "./FirstPage"

export default function App(){

    const [page, setPage] = useState(false)
    const [questions, setQuestions] = useState([])
    const [checkAnswers, setCheckAnswers] = useState(false)
    const [score, setScore] = useState(0)
    const [playAgain, setPlayAgain] = useState(false)
    const [formData, setFormData] = useState(
        {
            type: "9", 
            difficulty: "easy"
        }
    )
    
    useEffect(() => {
        let stopFetch = false
        fetch(`https://opentdb.com/api.php?amount=5&category=${formData.type}&difficulty=${formData.difficulty}&type=multiple`)
        .then(res => res.json())
        .then(data => {
            if(!stopFetch){
            setQuestions(data.results.map(oneData =>{
                const arra =[
                    {text: oneData.correct_answer, selected: false, correct: true, id: nanoid()},
                    {text: oneData.incorrect_answers[0], selected: false, correct: false, id: nanoid()},
                    {text: oneData.incorrect_answers[1], selected: false, correct: false, id: nanoid()},
                    {text: oneData.incorrect_answers[2], selected: false, correct: false, id: nanoid()}
                ]  
                
                const shuffledQuestions = arra
                    .map(value => ({ value, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map(({ value }) => value)

                return{
                    question: oneData.question,
                    id: nanoid(),
                    answers: shuffledQuestions
                }
            }))}  
        })
        return () =>{
            stopFetch = true
        }
    }, [playAgain || formData])

    const mapQuestions = questions.map((oneQuestion, index) => {
        
        const renderAnswers = oneQuestion.answers.map((renderQuestionAnswers, index) => {
            let style = []
            if(!checkAnswers){
                style = renderQuestionAnswers.selected ? ["#D6DBF5", 1] : ["#FFF", 1]
            }else if(checkAnswers){
                if(renderQuestionAnswers.correct){
                    style = ["#94D7A2", 1]
                }else if (renderQuestionAnswers.selected){
                    style = ["#F8BCBC", 0.7]
                }else{
                    style = ["#FFF", 0.7]
                }
                
            }

            return(
                <button 
                    key={index} 
                    className="second-page-box-buttons" 
                    style={{
                    backgroundColor: style[0],
                    opacity: style[1]
                    }} 
                    onClick={()=>selectAnswer(renderQuestionAnswers.id, oneQuestion.id)}
                    >
                    {parse(renderQuestionAnswers.text)}
                </button>
            )
        })      
  
        return(
            <div key={index} className="second-page-box" >
                <h3 className="second-page-box-header">{parse(oneQuestion.question)}</h3>
                <div className="second-page-box-questions">
                    {renderAnswers}
                </div>
            </div>
        )
    })

    function changePage(){
        setPage(prevPage => !prevPage)
    }

    function playNewGame(){
        setFormData({
            type: "9", 
            difficulty: "easy"
        })
        playGame()
        changePage()
    }

    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function selectAnswer(idAnswer, idQuestion){
        if(!checkAnswers){
            setQuestions(prevQuestions=> prevQuestions.map(oneQuestion =>{
                return {...oneQuestion, answers: oneQuestion.answers.map(oneAnswer =>{
                    if(oneQuestion.id === idQuestion){
                        return oneAnswer.id === idAnswer ? {...oneAnswer, selected: !oneAnswer.selected} : {...oneAnswer, selected: false}
                    }else{
                        return oneAnswer
                    }
                })}       
            })
            )
        }    
    }

    function checkAnswer(){
        setCheckAnswers(prevCheckAnswers => !prevCheckAnswers)

        questions.map(oneQuestion => {
            oneQuestion.answers.map(oneAnswer =>{
                if(oneAnswer.selected && oneAnswer.correct){
                    setScore(prevScore => prevScore + 1)
                }
            })}       
        )
    }

    function playGame(){
        setPlayAgain(prevPlayAgain => !prevPlayAgain)
        setScore(0)
        setCheckAnswers(prevCheckAnswers => !prevCheckAnswers)
    }

    return(
        <main>
        {
            !page ?
            <FirstPage 
            handleChange={handleChange}
            handleClick={changePage} />
            :
            <div className="second-page">
                {mapQuestions}
                <div className="second-page-bottom">
                    {checkAnswers && <h4 className="second-page-correct-answers">You scored <span className="second-page-correct-answers-number">{score}/5</span> correct answers!</h4>}
                    {!checkAnswers ? <button className="second-page-button" onClick={checkAnswer}>Check answers</button> : <div className="second-page-buttons"><button className="second-page-button" onClick={playGame}>Play again</button><button className="second-page-button" onClick={playNewGame}>Start new quiz</button></div>}
                </div>
            </div>
        } 
        </main>
    )
}