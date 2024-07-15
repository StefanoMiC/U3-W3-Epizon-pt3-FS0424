import { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { setUserAction } from "../redux/actions";
// la funzione connect è una funzinoe di alto livello HOF - Higher Order Function, che connette il nostro Componente allo Store,
// questa funzione vuole due parametri (mapStateToProps, mapDispatchToProps)

// questi due parametri "mapperanno" cioè applicheranno delle prop sul nostro componente a classe
// il nostro componente avrà sia le prop riguardanti la porzione di stato che vogliamo leggere,
// sia la funzione dispatch che sarà in grado di aggiornare lo stato con l'azione corrispondente

// 1) definiamo mapStateToProps

const mapStateToProps = state => {
  // questa funzione viene chiamata dalla connect, ci regala lo stato globale nel suo unico parametro,
  // questo ci permette di estrarre i valori che ci interessano dallo stato globale e mapparli (applicarli) come prop del componente

  // le proprietà che creiamo in questo oggetto diventano il nome della nostra prop, che avrà un qualche valore derivante dal nostro Redux Store
  return {
    user: state.user.content,
    cartLength: state.cart.content.length
  };
};

// 2) definiamo mapDispatchToProps
const mapDispatchToProps = dispatch => {
  // questa funzione ci regala la dispatch come parametro, regalatoci dalla connect

  // anche qui ritorneremo sempre un oggetto che rappresenterà le props che verranno applicate al componente, in questo caso avermo una prop chiamata
  // this.props.setUser()
  return {
    // nel caso in cui volessimo poter passare un parametro alla nostra funzione setUser, lo dobbiamo specificare nella sua definizione qua sotto,
    // per poi passare il valore come argomento durante la chiamata di this.props.setUser("stringa del nome")
    // chiamando setUser implicitamente stiamo anche eseguendo la dispatch di un'azione
    setUser: name => {
      dispatch(setUserAction(name));
      // dispatch({ type: SET_USER, payload: name });
    }
  };
};

class Footer extends Component {
  render() {
    const { setUser, user, cartLength } = this.props;

    return (
      <Row className="epizon-footer" onClick={() => setUser("Epicode2")}>
        <Col>
          <footer>
            <span className="text-muted">Epizon {new Date().getFullYear()}©</span> <span>Elementi nel carrello: {cartLength}</span>
            {user && <h3>Ciao, {user}</h3>}
          </footer>
        </Col>
      </Row>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
