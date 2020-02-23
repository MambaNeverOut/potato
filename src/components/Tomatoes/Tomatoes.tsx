import React from "react";
import "./Tomatoes.scss";
import { connect } from "react-redux";
import TomatoAction from "./TomatoAction";
import TomatoList from "./TomatoList";
import {
  addTomato,
  initTomatoes,
  updateTomato
} from "../../redux/actions/tomatoes";
import axios from "../../config/axios";
import _ from "lodash";
import { format } from "date-fns";

interface ITomatoesProps {
  addTomato: (payload: any) => any;
  updateTomato: (payload: any) => any;
  initTomatoes: (payload: any[]) => any;
  tomatoes: any[];
}

class Tomatoes extends React.Component<ITomatoesProps> {
  // constructor(props: any) {
  //   super(props);
  // }

  componentDidMount() {
    this.getTomatoes();
  }
  get unfinishedTomato() {
    return this.props.tomatoes.filter(
      (t: any) => !t.description && !t.ended_at && !t.aborted
    )[0];
  }
  get finishedTomatoes() {
    const finishedTomatoes = this.props.tomatoes.filter(
      t => t.description && t.ended_at && !t.aborted
    );
    const obj = _.groupBy(finishedTomatoes, tometo => {
      return format(tometo.started_at, "YYYY-MM-D");
    });
    return obj;
  }
  getTomatoes = async () => {
    try {
      const response = await axios.get("tomatoes");
      this.props.initTomatoes(response.data.resources);
    } catch (e) {
      throw new Error(e);
    }
  };

  startTomato = async () => {
    try {
      const response = await axios.post("tomatoes", {
        duration: 1500000
      });
      this.props.addTomato(response.data.resource);
    } catch (e) {
      throw new Error(e);
    }
  };
  public render() {
    return (
      <div className="Tomatoes" id="Tomatoes">
        <TomatoAction
          startTomato={this.startTomato}
          unfinishedTomato={this.unfinishedTomato}
          updateTomato={this.props.updateTomato}
        ></TomatoAction>
        <TomatoList finishedTomatoes={this.finishedTomatoes}></TomatoList>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  tomatoes: state.tomatoes,
  ...ownProps
});

const mapDispatchToProps = {
  addTomato,
  initTomatoes,
  updateTomato
};

export default connect(mapStateToProps, mapDispatchToProps)(Tomatoes);
