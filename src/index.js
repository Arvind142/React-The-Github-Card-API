import { render } from '@testing-library/react';
import axios from 'axios';
import React, { Component } from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.scss';

// header
const Header = ({ title }) => (
    <div className="header">{title}</div>
)

// test data
const testData = [
    {
        name: "Arvind Choudhary",
        company: "N-A",
        avatar_url: "https://avatars.githubusercontent.com/u/32151273?v=4",
        node_id: "MDQ6VXNlcjI1MjU0"
    },
    {
        name: "TJ Holowaychuk",
        company: "Apex",
        avatar_url: "https://avatars.githubusercontent.com/u/25254?v=4",
        node_id: "MDQ6VXNlcjI1Mj20"
    },

]

// form
class Form extends React.Component {
    state ={
        username:''
    }
    onSubmitFunction = async (event) => {
        event.preventDefault();
        const resp = await axios.get(`https://api.github.com/users/${this.state.username}`);
        const data = await resp.data;
        this.props.profileAdder(data);
        this.setState({username:''});

    }
    render() {
        return (
            <form onSubmit={this.onSubmitFunction}>
                <input 
                    type="text" 
                    value={this.state.username} 
                    onChange={
                        (event)=>this.setState({username:event.target.value})
                    } 
                placeholder="GitHub username" required />
                <button>Add card</button>
            </form>
        );
    }
}

// list of cards
const CardList = ({ profiles }) => (
    <div>
        {profiles.map(profile => <Card key={profile.node_id} profile={profile} />)}
    </div>
)

// single card
const Card = ({ profile }) => (
    <div className="github-profile">
        <img src={profile.avatar_url} />
        <div className="info">
            <div className="name">{profile.name}</div>
            <div className="company">{profile.company}</div>
        </div>
    </div>
)

//actual Appp who holds everyone and everything together
class App extends Component {
    // all profiles
    state = {
        profiles: []
    }
    // method to add profile
    addProfile = (profileData) => {
        console.log(profileData);
        this.setState(prevState => (
            {
            profiles:[...prevState.profiles,profileData]
            }
        ));
    };

    // what to render
    render() {
        return (
            <>
                <Header title={this.props.title} />
                <Form profileAdder={this.addProfile} />
                <CardList profiles={this.state.profiles} />
            </>
        )
    }
};

ReactDOM.createRoot(document.getElementById('root')).render(<App title='The Github Profile Card UI' />);
