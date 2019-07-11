import React from 'react'
import { shallow } from 'enzyme'
import Index from 'components/Index'

describe('Index component', () => {
  it('shows the data properly', () => {
    const data = [{"date":"2019-06-27",
                   "entries":[{"id":7,"amount":"5.55","currency":"USD","user_id":3,
                               "created_at":"2019-06-27T18:17:02.504Z",
                               "updated_at":"2019-06-27T18:17:02.504Z",
                               "name":"netflix"}]
                 }]

    const wrapper = shallow(<Index groupedEntries={data} />)
    const title   = wrapper.find('h4').text()
    const date    = wrapper.find('b').text()

    expect(title).toEqual('Your Entries:')
    expect(date).toEqual('6/27/2019')
  })
})
