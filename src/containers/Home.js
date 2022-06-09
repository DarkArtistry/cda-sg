import { connect } from 'react-redux'
import { } from '../actions'
import Home from '../components/Home'

const mapStateToProps = state => ({
    // openDrawer: state.navDrawers.isOpen,
})

const mapDispatchToProps = dispatch => ({
    // someaction: () => dispatch(someaction()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)