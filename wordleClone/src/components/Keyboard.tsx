

const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER","Z", "X", "C", "V", "B", "N", "M","⇍"]
  ];

  interface KeyboardProps{
    letterFunc: (pressedKey:string)=> void
  }
function Keyboard({letterFunc}:KeyboardProps) {

    const keyType = (keyString:string)=>{
        if(keyString==="ENTER"|| keyString==="⇍") return "specialKey"
    }
  return (
    <div className="keyboardHolder">

    <div className="keyboardContainer">
        {rows.map((arrKeys, idxx)=>{
            return <div key={idxx} className="keysRow">
{
            arrKeys.map((ky, idx)=>{
                return <span className={keyType(ky)} key={idx} onClick={()=>letterFunc(ky)}>{ky}</span>
            })}
            </div>
        })}
    </div>
        </div>
  );
};

export default Keyboard;
