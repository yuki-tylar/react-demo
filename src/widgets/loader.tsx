import { Component } from "react"
import { ScaleLoader } from "react-spinners";

export class MyLoader extends Component {
  render() {
    return (
      <div className="text-center subtitle1 py-25p">
        <ScaleLoader color='#838790'></ScaleLoader>
      </div>
    );
  }
}