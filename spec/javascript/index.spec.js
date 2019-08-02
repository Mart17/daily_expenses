import React from 'react'

import { shallow, mount } from 'enzyme'
import Index from 'components/Index'

const data = [{ "date":"2019-06-27",
                "entries":[{ "id":7,"amount":"5.55","currency":"€","user_id":3,
                             "created_at":"2019-06-27T18:17:02.504Z",
                             "updated_at":"2019-06-27T18:17:02.504Z",
                             "name":"Netflix" }] }]

describe('Index component', () => {
  it('shows the data properly', () => {
    const wrapper = shallow(<Index groupedEntries={data} />)

    const title    = wrapper.find('h4').text()
    const date     = wrapper.find('b').text()
    const input1   = wrapper.find('input').at(0).props().defaultValue
    const input2   = wrapper.find('input').at(1).props().defaultValue
    const select1  = wrapper.find('select').at(0).props().defaultValue

    expect(title).toEqual('Your Entries')
    expect(date).toEqual('6/27/2019')
    expect(input1).toEqual('Netflix')
    expect(input2).toEqual('5.55')
    expect(select1).toEqual('€')
  })

  it('removes entry', () => {
    const mockFuncDelete = jest.fn()

    // always click 'OK'
    window.confirm = jest.fn(() => true)

    const wrapper  = mount(<Index groupedEntries={data} handleDelete={mockFuncDelete} />)

    const icon = wrapper.find('svg')
    const date = wrapper.find('b').text()

    expect(wrapper.find('input').length).toBe(2)
    expect(wrapper.find('select').length).toBe(1)
    expect(icon.length).toBe(1)

    wrapper.find('svg').at(0).simulate('click')

    expect(window.confirm.mock.calls.length).toBe(1)

    // entry's id is 7, index of group is 0
    expect(mockFuncDelete).toBeCalledWith(7, 0)
  })

  // Enazyme can't work with document - Cannot read property 'style' of null
  it.skip('changes color dependening on value of amount', () => {
    const wrapper = mount(<Index groupedEntries={data} />)

    const entry       = wrapper.find('.entry').at(0)
    const amountInput = wrapper.find('input').at(1)
    //const children =
    //const input =
    //const select =

    expect(entry).toBeDefined()
    expect(entry.prop('style')).toHaveProperty('color', 'green')
    //expect(children.prop('style')).toHaveProperty('color', 'green')

    amountInput.instance().value = '-5.55'
    amountInput.simulate('change')

    expect(entry.prop('style')).toHaveProperty('color', 'red')
  })
})
