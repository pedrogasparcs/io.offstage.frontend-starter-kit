/**
 * Created by PedroGaspar on 26/10/2016.
 */
import React, {Component} from 'react'
//
import {connect} from 'react-redux'
import {sampleAction} from '../Actions/actionsSample'

import HelloForm from './../Components/HelloForm'

class SampleContainer extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    console.log(this.props)
    return <HelloForm/>
  }
}

const mapStateToProps = (state, props) => {
  const { reducerSample } = state
  return {
    ...props,
    sample: reducerSample
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    ...props,
    sampleAction: () => dispatch(sampleAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(SampleContainer)
