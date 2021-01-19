import React, { Component } from 'react';
import classes from './ReviewTheProject.css'
import buttonClasses from './ReviewProjects.css'
import axios from 'axios'
import DisplayFullProject from '../../Components/Multi/DisplayFullProject/DisplayFullProject'
import classesDisplay from '../../Components/Multi/DisplayFullProject/DisplayFullProject.css'
import { withRouter } from 'react-router-dom';


class ReviewTheProject extends Component {
    state = {
        grade: undefined,
        reviewLabels: undefined,
        projectData: {
            projectName: '',
            shortDescription: '',
            fullDescription: '',
            ytLink: '',
            ghLink: '',
            images: '',
            projectId: ''
        }

    }
    tags = new Set();
    handleChange = (e) => {
        this.setState({ label: e.target.value });
        this.tags.push(this.state.label)
    }

    label = ['Well documented', 'Poorly documented', 'Impressive', 'Unimpresive', 'Original', 'Unoriginal', 'Just OK', 'Could be better', 'Breathtaking', 'Great Job', 'Disapointing', "Creative!"]
    getProjecById = () => {
        const projId = window.location.pathname
        const str = projId.slice(-24)
    
        axios.get('http://localhost:3001/api/v1/projects/' + str).then(res => {
            console.log(res.data);
            const projData = {
                projectName: res.data.data.title,
                shortDescription: res.data.data.description,
                fullDescription: res.data.data.body,
                ytLink: res.data.data.video,
                ghLink: res.data.data.upload,
                images: res.data.data.images
            }
            this.setState({
                title: res.data.data.title,
                description: res.data.data.description,
                upload: res.data.data.upload,
                projectData: projData

            })

        }).catch(err => console.log(err))
    }
    handleCreateReview = () => {
        const projId = window.location.pathname
        const str = projId.slice(-24)
        console.log(str);
        const labelsToSend = Array.from(this.tags)
        const review = {
            label: labelsToSend,
            grade: this.state.grade
        }
        console.log(this.state);
        axios.post('http://localhost:3001/api/v1/reviews/' + str, review).then(res => {
            console.log(review);
           
        }).catch(err => console.log(err))
        this.props.history.push('/home/profile/project');
    }
    componentDidMount() {
        this.getProjecById()


    }

    render() {
            if(this.props.user.data.role==="reviewer"||this.props.user.data.role==="admin"){   
        return (
            <div >
                <br></br>
                <br></br>
                <br></br>
                <div >
                    <DisplayFullProject projectData={this.state.projectData} />
                </div>

                <div >
                    {/*Review here*/}
                    <h1 style={{ padding: "10px", textAlign: "center", paddingBottom: "20px" }}>Review the project</h1>
                    <p style={{ padding: "10px", textAlign: "center", paddingBottom: "20px", fontSize: "20PX" }}>Grade     <select className={buttonClasses.select} onChange={(e) => this.setState({ grade: e.target.value })}>
                            <option>--Grade this project--</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                        </select></p>
                    <div style={{ width: "5%", margin: "auto", marginBottom: '10px' }}>
                   
                    </div>
                    <div >
                        {
                            this.label.map(value =>
                                <button className={buttonClasses.tags} onClick={() => {
                                    this.tags.add(value)
                                }}>{value}</button>)
                        }
                    </div>
                    
                    <button
                        onClick={this.handleCreateReview}
                        className={classes.ReviewButton} >Review this project</button>
                        
                </div>
                <br></br>
                <br></br>
                <br></br>

            </div>
        );
    }else{
        return(
            <div  >
            <br></br>
            <br></br>
            <br></br>
            <div className={classesDisplay.DisplayFullProject}
            
            style={{width:"120%",marginLeft:"100px",marginRight:"100px"}}>
                <DisplayFullProject projectData={this.state.projectData} />
            </div>
            </div>
        )
    }

    }


}

export default withRouter(ReviewTheProject);