import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Adicione um novo animal</h1>
      <form>
        <div>
          <label>Nome Popular:</label>
          <input type="text" />
        </div>
        <div>
          <label>Nome Científico:</label>
          <input type="text" />
        </div>
        <button type='submit'>Adicionar</button>
      </form>
    </div>
  );
}

export default App;
