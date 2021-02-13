import React, { Component } from 'react';
import '../style/UserCard.scss';

class UserCard extends Component {
	  constructor(){
			super()
		  this.state = { 
				user: {
				  login: 'nick',
					avatar_url: '',
					name: '',
					location: '',
					followers: '',
					following: '',
					public_repos: '',
					blog: '',
					html_url: '',
					company: ''
				}
			}
		}
	fetchUser= (login) => this.updateList(`https://api.github.com/users/${login}`)
	updateList= (url) => fetch(url).then(data => data.json()).then(user => this.setState({ user }))
	searchUser(e){
		if(e.key === "Enter"){
			this.fetchUser(document.querySelector('#input').value);
			document.querySelector('#input').value = '';
		}
	}
	componentDidMount(){
		this.updateList(`https://api.github.com/users/${this.state.user.login}`)
	}
	render() {
		return ( 
			<div className="container text-center">
			<div className="input-holder">
			<input id="input" type="text" placeholder="Github user name" onKeyDown={this.searchUser.bind(this)} />
			</div>
			<div className={this.state.user.login ? "hide" : "not-found"}>
				<h3>Sorry, user not found...</h3>
			</div>
			<div className={this.state.user.login ? "info-holder" : "hide"}>
			<img className="user-avatar" src={this.state.user.avatar_url} alt="user avatar"/>
			<h4>{this.state.user.login}</h4><hr/>
			<h5>{this.state.user.name}</h5>
			<small>{this.state.user.company}</small><br/>
			<small>{this.state.user.location}</small>
			<div><hr/>
			<small>Followers</small>
			<h6>{this.state.user.followers}</h6><hr/>
			<small>Following</small>
			<h6>{this.state.user.following}</h6><hr/>
			<small>Repositories</small>
			<h6>{this.state.user.public_repos}</h6><hr/>
			<div style={{display: !this.state.user.blog ? 'none' : ''}}>
			<a href={this.state.user.html_url}>GitHub Account</a><br/> 
			<a href={this.state.user.blog}>Visit Personal Website</a>
			</div>
			</div>
			</div>
			</div>		
		 );
	}
}
export default UserCard;