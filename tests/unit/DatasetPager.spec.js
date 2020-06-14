import { shallowMount } from '@vue/test-utils';
import DatasetPager from '@/DatasetPager.vue';
import datasetI18n from '@/i18n/en.js';

const isButtonDisabled = function (el) {
  return el.tabIndex === -1 && el.hasAttribute('aria-disabled') === true;
};

const isButtonEnabled = function (el) {
  return el.hasAttribute('tabIndex') === false && el.hasAttribute('aria-disabled') === false;
};

describe('DatasetPager', () => {
  const testDiv = document.createElement('div');
  testDiv.setAttribute('id', 'test-div');
  document.body.appendChild(testDiv);

  const wrapper = shallowMount(DatasetPager, {
    provide: {
      datasetI18n: datasetI18n,
      setActive: function (value) {
        const testDiv = document.getElementById('test-div');
        testDiv.textContent = value;
      }
    },
    propsData: {
      dsPages: [1, 2, 3]
    }
  });

  it('renders a ul element', () => {
    const ul = wrapper.find('ul');
    expect(ul.exists()).toBe(true);
  });

  it('disables the previous button on first page', () => {
    wrapper.setProps({
      dsPage: 1
    });
    wrapper.vm.$nextTick(() => {
      const previousButton = wrapper.findAll('a').at(0).element;
      expect(isButtonDisabled(previousButton)).toBe(true);
    });
  });

  it('disables the previous button when there is only one page', () => {
    wrapper.setProps({
      dsPagecount: 1
    });
    wrapper.vm.$nextTick(() => {
      const previousButton = wrapper.findAll('a').at(0).element;
      expect(isButtonDisabled(previousButton)).toBe(true);
    });
  });

  it('enables the previous button', () => {
    wrapper.setProps({
      dsPage: 2,
      dsPagecount: 3
    });
    wrapper.vm.$nextTick(() => {
      const previousButton = wrapper.findAll('a').at(0).element;
      expect(isButtonEnabled(previousButton)).toBe(true);
    });
  });

  it('disables the next button on last page', () => {
    wrapper.setProps({
      dsPage: 4,
      dsPagecount: 4
    });
    wrapper.vm.$nextTick(() => {
      const buttons = wrapper.findAll('a');
      const nextButton = buttons.at(buttons.length - 1).element;
      expect(isButtonDisabled(nextButton)).toBe(true);
    });
  });

  it('disables the next button when there is only one page', () => {
    wrapper.setProps({
      dsPagecount: 1
    });
    wrapper.vm.$nextTick(() => {
      const buttons = wrapper.findAll('a');
      const nextButton = buttons.at(buttons.length - 1).element;
      expect(isButtonDisabled(nextButton)).toBe(true);
    });
  });

  it('enables the next button', () => {
    wrapper.setProps({
      dsPage: 2,
      dsPagecount: 3
    });
    wrapper.vm.$nextTick(() => {
      const buttons = wrapper.findAll('a');
      const nextButton = buttons.at(buttons.length - 1).element;
      expect(isButtonEnabled(nextButton)).toBe(true);
    });
  });

  it('makes the normal page button active', () => {
    wrapper.setProps({
      dsPage: 1,
      dsPagecount: 3
    });
    wrapper.vm.$nextTick(() => {
      const li = wrapper.findAll('li').at(1);
      expect(li.classes()).toContain('active');
    });
  });

  it('makes the ... page button disabled', () => {
    wrapper.setProps({
      dsPages: [1, '...', 4, 5, 6],
      dsPage: 6,
      dsPagecount: 6
    });
    wrapper.vm.$nextTick(() => {
      const li = wrapper.findAll('li').at(2);
      expect(li.classes()).toContain('disabled');
      expect(li.find('span').exists()).toBe(true);
    });
  });

});
