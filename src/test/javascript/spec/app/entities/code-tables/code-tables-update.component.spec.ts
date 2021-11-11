/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import CodeTablesUpdateComponent from '@/entities/code-tables/code-tables-update.vue';
import CodeTablesClass from '@/entities/code-tables/code-tables-update.component';
import CodeTablesService from '@/entities/code-tables/code-tables.service';

import CodeValuesService from '@/entities/code-values/code-values.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('CodeTables Management Update Component', () => {
    let wrapper: Wrapper<CodeTablesClass>;
    let comp: CodeTablesClass;
    let codeTablesServiceStub: SinonStubbedInstance<CodeTablesService>;

    beforeEach(() => {
      codeTablesServiceStub = sinon.createStubInstance<CodeTablesService>(CodeTablesService);

      wrapper = shallowMount<CodeTablesClass>(CodeTablesUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          codeTablesService: () => codeTablesServiceStub,
          alertService: () => new AlertService(),

          codeValuesService: () => new CodeValuesService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.codeTables = entity;
        codeTablesServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(codeTablesServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.codeTables = entity;
        codeTablesServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(codeTablesServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCodeTables = { id: 123 };
        codeTablesServiceStub.find.resolves(foundCodeTables);
        codeTablesServiceStub.retrieve.resolves([foundCodeTables]);

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
