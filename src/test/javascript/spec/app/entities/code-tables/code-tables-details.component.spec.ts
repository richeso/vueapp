/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import CodeTablesDetailComponent from '@/entities/code-tables/code-tables-details.vue';
import CodeTablesClass from '@/entities/code-tables/code-tables-details.component';
import CodeTablesService from '@/entities/code-tables/code-tables.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('CodeTables Management Detail Component', () => {
    let wrapper: Wrapper<CodeTablesClass>;
    let comp: CodeTablesClass;
    let codeTablesServiceStub: SinonStubbedInstance<CodeTablesService>;

    beforeEach(() => {
      codeTablesServiceStub = sinon.createStubInstance<CodeTablesService>(CodeTablesService);

      wrapper = shallowMount<CodeTablesClass>(CodeTablesDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { codeTablesService: () => codeTablesServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundCodeTables = { id: 123 };
        codeTablesServiceStub.find.resolves(foundCodeTables);

        // WHEN
        comp.retrieveCodeTables(123);
        await comp.$nextTick();

        // THEN
        expect(comp.codeTables).toBe(foundCodeTables);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCodeTables = { id: 123 };
        codeTablesServiceStub.find.resolves(foundCodeTables);

        // WHEN
        comp.beforeRouteEnter({ params: { codeTablesId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.codeTables).toBe(foundCodeTables);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
