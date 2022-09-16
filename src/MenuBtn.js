import './App.scss';

export default function MenuBtn(props) {
  return (
    <button className="menu__btn" onClick={props.onClick} id={props.id}>
      <span>{props.label}</span>
    </button>
  );
}
