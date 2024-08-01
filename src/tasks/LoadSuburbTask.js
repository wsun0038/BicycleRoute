import {features} from '../data/suburb-mel.json'

class LoadSuburbTask{

    load = (setState) =>{
        setState(features)
    }
}

export default LoadSuburbTask;