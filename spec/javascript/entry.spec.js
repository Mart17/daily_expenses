import React from 'react'

import { shallow, mount } from 'enzyme'
import Entry from 'components/Entry'

const data = { "id":"7","amount":"5.55","currency":"€","user_id":"3","created_at":"2019-06-27T18:17:02.504Z",
                "updated_at":"2019-06-27T18:17:02.504Z", "name":"Netflix" }

describe('Entry component', () => {
  it('shows the data properly', () => {
    const wrapper = shallow(<Entry entry={data} groupIndex='0' />)

    const input1   = wrapper.find('input').at(0).props().defaultValue
    const input2   = wrapper.find('input').at(1).props().defaultValue
    const select1  = wrapper.find('select').at(0).props().defaultValue

    expect(input1).toEqual('Netflix')
    expect(input2).toEqual('5.55')
    expect(select1).toEqual('€')
  })

  it('removes entry', () => {
    const mockFuncDelete = jest.fn()

    // always click 'OK'
    window.confirm = jest.fn(() => true)

    const wrapper  = mount(<Entry entry={data} groupIndex='0' handleDelete={mockFuncDelete} />)

    const icon = wrapper.find('svg')

    expect(wrapper.find('input').length).toBe(2)
    expect(wrapper.find('select').length).toBe(1)
    expect(icon.length).toBe(1)

    wrapper.find('svg').at(0).simulate('click')

    expect(window.confirm.mock.calls.length).toBe(1)

    // entry's id is 7, index of group is 0
    expect(mockFuncDelete).toBeCalledWith('7', '0')
  })

  it('updates record on change of amount', () => {
    const mockHandleUpdate = jest.fn()

    const wrapper = mount(<Entry entry={data} groupIndex={0} handleUpdate={mockHandleUpdate} />)

    const amountInput = wrapper.find('input').at(1)

    amountInput.instance().value = '-5.55'
    amountInput.simulate('change')

    expect(mockHandleUpdate).toBeCalledWith('7', 'amount', '-5.55')
  })
})
