/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import CodeTablesComponent from '@/entities/code-tables/code-tables.vue';
import CodeTablesClass from '@/entities/code-tables/code-tables.component';
import CodeTablesService from '@/entities/code-tables/code-tables.service';
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
  describe('CodeTables Management Component', () => {
    let wrapper: Wrapper<CodeTablesClass>;
    let comp: CodeTablesClass;
    let codeTablesServiceStub: SinonStubbedInstance<CodeTablesService>;

    beforeEach(() => {
      codeTablesServiceStub = sinon.createStubInstance<CodeTablesService>(CodeTablesService);
      codeTablesServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<CodeTablesClass>(CodeTablesComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          codeTablesService: () => codeTablesServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      codeTablesServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllCodeTabless();
      await comp.$nextTick();

      // THEN
      expect(codeTablesServiceStub.retrieve.called).toBeTruthy();
      expect(comp.codeTables[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      codeTablesServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeCodeTables();
      await comp.$nextTick();

      // THEN
      expect(codeTablesServiceStub.delete.called).toBeTruthy();
      expect(codeTablesServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
