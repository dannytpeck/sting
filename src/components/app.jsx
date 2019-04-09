import React, { Component } from 'react';
import moment from 'moment';

import Header from './header';
import Footer from './footer';
import Modal from './modal';
import Tile from './tile';

import dynamicSort from '../helpers/dynamicSort';

/* globals $ */
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clients: [],
      selectedClient: null,
      tiles: [],
      activities: []
    };
  }

  componentDidMount() {
    $.getJSON('https://api.airtable.com/v0/appHXXoVD1tn9QATh/Clients?api_key=keyCxnlep0bgotSrX&view=sorted').done(data => {
      let records = data.records;

      if (data.offset) {
        $.getJSON(`https://api.airtable.com/v0/appHXXoVD1tn9QATh/Clients?api_key=keyCxnlep0bgotSrX&view=sorted&offset=${data.offset}`).done(data => {
          this.setState({
            clients: [...records, ...data.records]
          });
        });
      } else {
        this.setState({
          clients: records
        });
      }

    });
  }

  getHomePageActivities(client) {
    if (client) {
      if (client.fields['LimeadeAccessToken']) {
        console.log('Getting visible Home page activities for ' + client.fields['Account Name']);
        $.ajax({
          url: 'https://api.limeade.com/api/activities/?types=5&status=1&attributes=1&contents=32319',
          type: 'GET',
          dataType: 'json',
          headers: {
            Authorization: 'Bearer ' + client.fields['LimeadeAccessToken']
          },
          contentType: 'application/json; charset=utf-8'
        }).done(result => {
          const tiles = result.Data;

          // Do stuff here
          console.log(tiles);
          this.setState({ tiles: tiles });

        }).fail((xhr, textStatus, error) => {
          console.error(`${client.fields['Account Name']} - GET Activities has failed`);
        });

      } else {
        console.error(`${client.fields['Account Name']} has no LimeadeAccessToken`);
      }
    } else {
      console.log('No client has been selected');
    }
  }

  getAllActivities(client) {
    if (client) {
      if (client.fields['LimeadeAccessToken']) {
        console.log('Getting all activities (past, current, and scheduled) for ' + client.fields['Account Name']);
        $.ajax({
          url: 'https://api.limeade.com/api/admin/activity',
          type: 'GET',
          dataType: 'json',
          headers: {
            Authorization: 'Bearer ' + client.fields['LimeadeAccessToken']
          },
          contentType: 'application/json; charset=utf-8'
        }).done(result => {
          const activities = result.Data;

          // Do stuff here
          console.log(activities);
          this.setState({ activities: activities });

        }).fail((xhr, textStatus, error) => {
          console.error(`${client.fields['Account Name']} - GET ActivityLifecycle has failed`);
        });

      } else {
        console.error(`${client.fields['Account Name']} has no LimeadeAccessToken`);
      }
    } else {
      console.log('No client has been selected');
    }
  }

  setSelectedClient(e) {
    this.state.clients.forEach((client) => {
      if (client.fields['Limeade e='] === e.target.value) {
        this.setState({ selectedClient: client });
      }
    });
  }

  openActivity(activity) {
    $('#tileModal').modal();
    $('#tileModalBody').html(`
      <img class="tile-image" src=${activity.ChallengeLogoURL} />
      <h3 class="my-3">${activity.Name}</h3>
      <div>${activity.ShortDescription}</div>
      <div>${activity.AboutChallenge}</div>
    `);
  }

  renderEmployerNames() {
    return this.state.clients.map((client) => {
      return <option key={client.id}>{client.fields['Limeade e=']}</option>;
    });
  }

  renderTiles() {
    return this.state.tiles.map((tile) => {
      return <Tile key={tile.Id} tile={tile} />;
    });
  }

  renderActivities() {

    // Filter out CIEs and past activities
    const activities = this.state.activities.filter(activity => {
      return activity.ChallengeId > 0 && activity.Status !== 'Completed';
    });

    activities.sort(dynamicSort('Status'));

    return activities.map((activity) => {
      return (
        <tr key={activity.ChallengeId} onClick={() => this.openActivity(activity)}>
          <td>{activity.Name}</td>
          <td>{activity.ChallengeId}</td>
          <td>{moment(activity.StartDate).format('ll')}</td>
          <td>{moment(activity.EndDate).format('ll')}</td>
          <td>{activity.Status}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div id="app">
        <Header />

        <div className="form-group">
          <label htmlFor="employerName">EmployerName</label>
          <select id="employerName" className="form-control custom-select" onChange={(e) => this.setSelectedClient(e)}>
            <option defaultValue>Select Employer</option>
            {this.renderEmployerNames()}
          </select>
        </div>

        <button type="button" className="btn btn-primary" onClick={() => this.getHomePageActivities(this.state.selectedClient)}>What's on My Home Page?</button>
        <p>(show's the home page as seen by the Admin)</p>

        <button type="button" className="btn btn-primary" onClick={() => this.getAllActivities(this.state.selectedClient)}>I'd Rather See Everything</button>
        <p>(show's all challenges current and scheduled)</p>

        <div id="tileContainer">
          {this.renderTiles()}
        </div>

        <table className="table table-hover table-striped" id="activities">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">ChallengeId</th>
              <th scope="col">StartDate</th>
              <th scope="col">EndDate</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {this.renderActivities()}
          </tbody>
        </table>

        <Footer />
        <Modal />
      </div>
    );
  }
}

export default App;
