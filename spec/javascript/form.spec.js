import React from 'react'

import { shallow } from 'enzyme'
import Form from 'components/Form'

describe('Form component', () => {
  it('renders inputs', () => {

    const wrapper = shallow(<Form />)

    expect(wrapper.find('h4').text()).toEqual('New Entry')
    expect(wrapper.find('input').length).toEqual(4)
  })

  /* FIXME
  it('changes state', () => {
    const wrapper = shallow(<Form />)
    const instance = wrapper.instance()

    wrapper.find('input').at(1).simulate('change', {
      target: { value: '5.55' }
    })
    wrapper.find('input').at(2).simulate('change', {
      target: { value: 'USD' }
    })

    expect(instance.state.entry).toEqual({ 'name': 'Netflix', 'amount': '5.55', 'currency': 'USD' })
  }) */

  /* TODO
  it('Adds new entry after submit', () => {

  }) */
})
