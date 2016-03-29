import AltContainer from 'alt-container';
import React from 'react';
import Lanes from './Lanes.jsx';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <button className="add-lane" onClick={this.addLane}>+</button>
        <AltContainer
          stores={[LaneStore]}
          inject={{
            lanes: () => LaneStore.getState().lanes
          }}
        >
          <Lanes onEdit={this.editLane} onDelete={this.deleteLane} />
        </AltContainer>
      </div>
    );
  }
  addLane() {
    LaneActions.create({task: 'New task'});
  }
  editLane(id, task) {
    if(!task.trim()) {
      return;
    }

    LaneActions.update({id, task});
  }
  deleteLane(id, e) {
    e.stopPropagation();

    LaneActions.delete(id);
  }
}
