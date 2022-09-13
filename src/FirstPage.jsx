export default function FirstPage(props){
    return(
            <div className="first-page">
                <p className="first-page-allert">Quizlandia is intended for solving questions in English, when choosing another language,the questions/answers may be translated incorrectly.</p>
                <form className="first-page-form">
                    <label htmlFor="type">Select a quiz category:</label>
                    <br />
                    <select 
                    id="type"
                    name="type"
                    value={props.handleValue}
                    onChange={props.handleChange}
                >
                    <option value="9">General Knowledge</option>
                    <option value="10">Books</option>
                    <option value="11">Films</option>
                    <option value="12">Music</option>
                    <option value="15">Video Games</option>
                    <option value="17">Science and Nature</option>
                    <option value="18">Computers</option>
                    <option value="20">Mythology</option>
                    <option value="24">Politics</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="27">Animals</option>
                    <option value="28">Vehicles</option>
                    <option value="23">History</option>
                    <option value="25">Art</option>

                    </select>
                     <br />
                    <label htmlFor="difficulty">Choose a difficulty:</label>
                    <br />
                    <select 
                    id="difficulty"
                    name="difficulty"
                    value={props.handleValue}
                    onChange={props.handleChange}
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    </select> 

                </form>
                <div className="first-page-bottom">
                    <h1 className="first-page-header">Quizlandia</h1>
                    <p className="first-page-name">Marek Varga</p>
                    <button className="first-page-button" onClick={props.handleClick}>Start</button>
                </div>
            </div>
    )
}