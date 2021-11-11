import { Component, Vue, Inject } from 'vue-property-decorator';

import { required, minLength } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import CodeTablesService from '@/entities/code-tables/code-tables.service';
import { ICodeTables } from '@/shared/model/code-tables.model';

import { ICodeValues, CodeValues } from '@/shared/model/code-values.model';
import CodeValuesService from './code-values.service';

const validations: any = {
  codeValues: {
    key: {
      required,
      minLength: minLength(3),
    },
    value: {},
  },
};

@Component({
  validations,
})
export default class CodeValuesUpdate extends Vue {
  @Inject('codeValuesService') private codeValuesService: () => CodeValuesService;
  @Inject('alertService') private alertService: () => AlertService;

  public codeValues: ICodeValues = new CodeValues();

  @Inject('codeTablesService') private codeTablesService: () => CodeTablesService;

  public codeTables: ICodeTables[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.codeValuesId) {
        vm.retrieveCodeValues(to.params.codeValuesId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.codeValues.id) {
      this.codeValuesService()
        .update(this.codeValues)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('vueappApp.codeValues.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.codeValuesService()
        .create(this.codeValues)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('vueappApp.codeValues.created', { param: param.id });
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public retrieveCodeValues(codeValuesId): void {
    this.codeValuesService()
      .find(codeValuesId)
      .then(res => {
        this.codeValues = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.codeTablesService()
      .retrieve()
      .then(res => {
        this.codeTables = res.data;
      });
  }
}
