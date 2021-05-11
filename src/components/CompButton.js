
const CompButton = ({ text, onclik }) => {


    return (<div>
        <button onClick={onclik}> {text} </button>
    </div>);
}
export default CompButton;