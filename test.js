import React from 'react';
import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from './client/components/form-top.jsx';
import FormBot from './client/components/form-bot.jsx';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

describe('testing Stars component', () => {
  var state = {
    stars: 4,
    reviews: 400,
    nightlyPrice: 50
  }

  test('should have 4 full (.fas) stars and 1 empty (.far) star', () => {
    const wrapper = mount(<Header info={state} />);
    expect(wrapper.find('.fas.fa-star')).toHaveLength(4);
    expect(wrapper.find('.far.fa-star')).toHaveLength(1);
  });
  test('should have render a half star if star has a decimal between .25 and .75', () => {
    state.stars = 3.25;
    const wrapper = mount(<Header info={state} />);
    expect(wrapper.find('.fas.fa-star')).toHaveLength(3);
    expect(wrapper.find('.fas.fa-star-half-alt')).toHaveLength(1);
    expect(wrapper.find('.far.fa-star')).toHaveLength(1);

    state.stars = 3.75;
    const wrap = mount(<Header info={state} />);
    expect(wrap.find('.fas.fa-star')).toHaveLength(3);
    expect(wrap.find('.fas.fa-star-half-alt')).toHaveLength(1);
    expect(wrap.find('.far.fa-star')).toHaveLength(1);
  });
  test('should render a full star for decimal above .75', () => {
    state.stars = 3.8;
    const wrapper = mount(<Header info={state} />);
    expect(wrapper.find('.fas.fa-star')).toHaveLength(4);
    expect(wrapper.find('.fas.fa-star-half-alt')).toHaveLength(0);
    expect(wrapper.find('.far.fa-star')).toHaveLength(1);
  });
  test('should render a full star for decimal below .25', () => {
    state.stars = 3.24;
    const wrapper = mount(<Header info={state} />);
    expect(wrapper.find('.fas.fa-star')).toHaveLength(3);
    expect(wrapper.find('.fas.fa-star-half-alt')).toHaveLength(0);
    expect(wrapper.find('.far.fa-star')).toHaveLength(2);
  });
});

describe('Testing of props in Header component', () => {
  var state = {
    stars: 4,
    reviews: 400,
    nightlyPrice: 50
  }
  const wrapper = shallow(<Header info={state} />);

  test('should have stars component and number of reviewed inside one div', () => {
    expect(wrapper.find('.reviews').children).toHaveLength(1);
    expect(wrapper.find('.reviews').text()).toEqual('<Stars /> 400');
  });
  test('should render price per night in first child div', () => {
    expect(wrapper.childAt(0).text()).toEqual('$50 per night');
  });
  test('should take price from passed props', () => {
    state.nightlyPrice = 100;
    const wrapper = shallow(<Header info={state} />);
    expect(wrapper.childAt(0).text()).toEqual('$100 per night');
  });
});

describe('increasing and decreasing guests in FormBot', () => {
  var state = {
    showPayment: true,
    numNights: 3,
    nightlyPrice: 50,
    cleaningFee: 100,
    serviceFee: 20,
    maxGuests: 4,
  }

  const wrapper = mount(<FormBot details={state} />);

  test('should increase this.state.guests when "+" button is clicked', () => {
    wrapper.find('.plus').simulate('click');
    expect(wrapper.state('guests')).toBe(2);
  });
  test('should not exceed mexGuests', () => {
    wrapper.find('.plus').simulate('click');
    expect(wrapper.state('guests')).toBe(3);
    wrapper.find('.plus').simulate('click');
    expect(wrapper.state('guests')).toBe(4);
    wrapper.find('.plus').simulate('click');
    expect(wrapper.state('guests')).toBe(4);
  });
  
  test('should decrease this.state.guests when "+" button is clicked', () => {
    wrapper.setState({guests: 2});
    wrapper.find('.minus').simulate('click');
    expect(wrapper.state('guests')).toBe(1);
  });
  test('should not go below 1 guest', () => {
    wrapper.setState({guests: 2});
    wrapper.find('.minus').simulate('click');
    expect(wrapper.state('guests')).toBe(1);
    wrapper.find('.minus').simulate('click');
    expect(wrapper.state('guests')).toBe(1);
  });
});

describe('other functionality for FormBot', () => {
  var state = {
    showPayment: false,
    numNights: 3,
    nightlyPrice: 50,
    cleaningFee: 100,
    serviceFee: 20,
    maxGuests: 4,
  }

  const wrapper = mount(<FormBot details={state} />);

  test('should not render the bottom form if showPayment is false', () => {
    expect(wrapper.find('.form-form')).toHaveLength(0);
  });

  test('should render the bottom form if showPayment is true', () => {
    state.showPayment = true;
    const wrapper = mount(<FormBot details={state} />);
    expect(wrapper.find('.form-form')).toHaveLength(1);
  });
});

// test('snapshot', () => {
//   var state = {
//     stars: 4,
//     reviews: 400,
//     nightlyPrice: 50
//   }
//   const wrapper = renderer.create(<Header info={state} />);
//   console.log(wrapper.toJSON());
//   console.log(wrapper.toJSON().children);
//   console.log(wrapper.toJSON().children[0].children[0]);

//   // expect(wrapper.findAllByType('span')).toHaveLength(2);
//   expect(wrapper).toMatchSnapshot();
// });



// test('bot', () => {
//   const state = {
//     showPayment: true,
//     numNights: 3,
//     nightlyPrice: 50,
//     cleaningFee: 100,
//     serviceFee: 20,
//   }
//   const wrapper = shallow(<FormBot details={state}/>);
//   expect(wrapper.find('button').text()).toEqual('BOOK');
// });