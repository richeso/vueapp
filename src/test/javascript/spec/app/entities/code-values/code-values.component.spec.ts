/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import CodeValuesComponent from '@/entities/code-values/code-values.vue';
import CodeValuesClass from '@/entities/code-values/code-values.component';
import CodeValuesService from '@/entities/code-values/code-values.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('CodeValues Management Component', () => {
    let wrapper: Wrapper<CodeValuesClass>;
    let comp: CodeValuesClass;
    let codeValuesServiceStub: SinonStubbedInstance<CodeValuesService>;

    beforeEach(() => {
      codeValuesServiceStub = sinon.createStubInstance<CodeValuesService>(CodeValuesService);
      codeValuesServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<CodeValuesClass>(CodeValuesComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          codeValuesService: () => codeValuesServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      codeValuesServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllCodeValuess();
      await comp.$nextTick();

      // THEN
      expect(codeValuesServiceStub.retrieve.called).toBeTruthy();
      expect(comp.codeValues[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      codeValuesServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeCodeValues();
      await comp.$nextTick();

      // THEN
      expect(codeValuesServiceStub.delete.called).toBeTruthy();
      expect(codeValuesServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
