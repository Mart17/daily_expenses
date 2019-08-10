import React from 'react'

import { shallow, mount } from 'enzyme'
import Form from 'components/Form'

describe('Form component', () => {
  it('renders inputs', () => {

    const wrapper = shallow(<Form />)

    expect(wrapper.find('h4').text()).toEqual('New Entry')
    expect(wrapper.find('input').length).toEqual(3)
    expect(wrapper.find('select').length).toEqual(1)
  })

  it('updates state', () => {
    const mockFunc = jest.fn()
    const wrapper = mount(<Form handleCreate={mockFunc} defaultCurrency='€' />)

    const input1  = wrapper.find('input').at(0)
    const input2  = wrapper.find('input').at(1)
    const select1 = wrapper.find('select').at(0)

    input1.simulate('change', { target: { name: 'name', value: 'Netflix' } })
    input2.simulate('change', { target: { name: 'amount', value: '5.55' } })
    select1.simulate('change', { target: { name: 'currency', value: '$' } })

    expect(wrapper.state().entry).toEqual({ 'name': 'Netflix', 'amount': '5.55', 'currency': '$' })

    wrapper.find('input').at(2).simulate('click')

    expect(wrapper.state().entry).toEqual({ 'name': '', 'amount': '', 'currency': '€' })

    expect(mockFunc.mock.calls.length).toBe(1)
    expect(mockFunc).toBeCalledWith({ 'name': 'Netflix', 'amount': '5.55', 'currency': '$' })
  })
})
