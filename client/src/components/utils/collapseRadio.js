import React, { Component } from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown'
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Collapse from '@material-ui/core/Collapse'

class CollapseRadio extends Component {
    state = {
        open: false,
        value: '0'
    }

    componentDidMount() {
        if (this.props.initState) {
            this.setState({
                open: this.props.initState
            })
        }
    }

    handleClick = () => {
        this.setState({
            open: !this.state.open
        })
    }

    handleArrow = () => (
        this.state.open ? 
            <FontAwesomeIcon 
             icon={faAngleUp}
             className="icon"
            />
        : 
            <FontAwesomeIcon 
            icon={faAngleDown}
            className="icon"
        />
    )

    renderList = () => (
        this.props.list ?
            this.props.list.map(value => (
                <FormControlLabel 
                    key={value._id}
                    value={`${value._id}`}
                    control={<Radio />}
                    label={value.name}
                />
            ))
        : null
    )

    handleChange = (e) => {
        this.props.handleFilters(e.target.value)
        this.setState({
            value: e.target.value
        })
    }

    render() {
        return (
            <div>
                <List style={{borderBottom:'1px solid #dbdbdb'}}>
                    <ListItem onClick={this.handleClick} style={{padding: '10px 23px 10px 0'}}>
                        <ListItemText
                            primary={this.props.title}
                            className="collapse_title"
                        />
                        {this.handleArrow()}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablepadding>
                            
                            <RadioGroup
                                aria-label="prices"
                                name="prices"
                                value={this.state.value}
                                onChange={this.handleChange}
                            >
                                { this.renderList() }
                            </RadioGroup>
                        </List>
                    </Collapse>
                </List>
            </div>
        );
    }
}

export default CollapseRadio;