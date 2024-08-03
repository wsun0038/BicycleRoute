import {features} from '../data/routes.json'

class LoadRouteTask{
    load = (setRoute) => {
        setRoute(features)
    }
}

export default LoadRouteTask