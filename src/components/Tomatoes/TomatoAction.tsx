import React from "react";
import { Button } from "antd";

interface ITomatoActionProps {
  startTomato: () => void;
  unfinishedTomato: any;
}

class TomatoAction extends React.Component<ITomatoActionProps> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className="TomatoAction" id="TomatoAction">
        <Button
          className="startTomatoButton"
          onClick={e => this.props.startTomato()}
        >
          开始番茄
        </Button>
      </div>
    );
  }
}

export default TomatoAction;
