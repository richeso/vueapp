import { Component, Vue, Inject } from 'vue-property-decorator';

import { required, minLength } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import CodeValuesService from '@/entities/code-values/code-values.service';
import { ICodeValues } from '@/shared/model/code-values.model';

import { ICodeTables, CodeTables } from '@/shared/model/code-tables.model';
import CodeTablesService from './code-tables.service';

const validations: any = {
  codeTables: {
    description: {
      required,
      minLength: minLength(5),
    },
  },
};

@Component({
  validations,
})
export default class CodeTablesUpdate extends Vue {
  @Inject('codeTablesService') private codeTablesService: () => CodeTablesService;
  @Inject('alertService') private alertService: () => AlertService;

  public codeTables: ICodeTables = new CodeTables();

  @Inject('codeValuesService') private codeValuesService: () => CodeValuesService;

  public codeValues: ICodeValues[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.codeTablesId) {
        vm.retrieveCodeTables(to.params.codeTablesId);
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
    if (this.codeTables.id) {
      this.codeTablesService()
        .update(this.codeTables)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('vueappApp.codeTables.updated', { param: param.id });
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
      this.codeTablesService()
        .create(this.codeTables)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('vueappApp.codeTables.created', { param: param.id });
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

  public retrieveCodeTables(codeTablesId): void {
    this.codeTablesService()
      .find(codeTablesId)
      .then(res => {
        this.codeTables = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.codeValuesService()
      .retrieve()
      .then(res => {
        this.codeValues = res.data;
      });
  }
}
