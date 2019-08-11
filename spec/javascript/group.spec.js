import React from 'react'

import { shallow, mount } from 'enzyme'
import Group from 'components/Group'

const data = { "date":"2019-06-27",
                "entries":[{ "id":"7","amount":"5.55","currency":"€","user_id":"3",
                             "created_at":"2019-06-27T18:17:02.504Z",
                             "updated_at":"2019-06-27T18:17:02.504Z",
                             "name":"Netflix" },
                           { "id":"8","amount":"8.22","currency":"€","user_id":"3",
                                        "created_at":"2019-06-27T18:17:22.504Z",
                                        "updated_at":"2019-06-27T18:17:22.504Z",
                                        "name":"Drink" },
                           { "id":"9","amount":"1.26","currency":"$","user_id":"3",
                                        "created_at":"2019-06-27T18:18:22.504Z",
                                        "updated_at":"2019-06-27T18:18:22.504Z",
                                        "name":"Apple" },
                           { "id":"10","amount":"15.00","currency":"£","user_id":"3",
                                        "created_at":"2019-06-27T18:18:22.504Z",
                                        "updated_at":"2019-06-27T18:18:22.504Z",
                                        "name":"Uber" }]
              }

describe('Group component', () => {
  it('shows the date properly', () => {
    const wrapper = shallow(<Group group={data} />)

    expect(wrapper.find('b').text()).toEqual('6/27/2019')
  })

  it('shows currency calculations properly', () => {
    const wrapper = shallow(<Group group={data} />)

    const calculationsSpans = wrapper.find('span')

    // no commas as those are included by CSS
    expect(calculationsSpans.at(0).text()).toEqual(' (€: 13.77$: 1.26£: 15)')
    expect(calculationsSpans.at(1).text()).toEqual('€: 13.77')
    expect(calculationsSpans.at(2).text()).toEqual('$: 1.26')
    expect(calculationsSpans.at(3).text()).toEqual('£: 15')
  })
})
