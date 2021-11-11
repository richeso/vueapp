/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import CodeValuesUpdateComponent from '@/entities/code-values/code-values-update.vue';
import CodeValuesClass from '@/entities/code-values/code-values-update.component';
import CodeValuesService from '@/entities/code-values/code-values.service';

import CodeTablesService from '@/entities/code-tables/code-tables.service';
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
  describe('CodeValues Management Update Component', () => {
    let wrapper: Wrapper<CodeValuesClass>;
    let comp: CodeValuesClass;
    let codeValuesServiceStub: SinonStubbedInstance<CodeValuesService>;

    beforeEach(() => {
      codeValuesServiceStub = sinon.createStubInstance<CodeValuesService>(CodeValuesService);

      wrapper = shallowMount<CodeValuesClass>(CodeValuesUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          codeValuesService: () => codeValuesServiceStub,
          alertService: () => new AlertService(),

          codeTablesService: () => new CodeTablesService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.codeValues = entity;
        codeValuesServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(codeValuesServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.codeValues = entity;
        codeValuesServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(codeValuesServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCodeValues = { id: 123 };
        codeValuesServiceStub.find.resolves(foundCodeValues);
        codeValuesServiceStub.retrieve.resolves([foundCodeValues]);

        // WHEN
        comp.beforeRouteEnter({ params: { codeValuesId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.codeValues).toBe(foundCodeValues);
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
