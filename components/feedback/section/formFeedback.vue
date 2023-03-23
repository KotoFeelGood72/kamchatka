<template>
    <form
        enctype="multipart/form-data"
        class="feedback-modal__form"
        :class="{'feedback-form-3': idForm === '3'}"
        autocomplete="off"
    >
        <div class>
            <div class="row">
                <div
                    class="col-sm-12 col-md-6 feedback__field"
                    :class="{'error-field' : errorFio && model.fio.length < 2}"
                >
                    <input
                        v-model="model.fio"
                        id="feedbackFIO"
                        autocomplete="false"
                        required="true"
                        name="fio"
                        type="text"
                        maxlength="25"
                    />
                    <span class="bar"/>
                    <label class="feedback-modal-prehover" for="feedbackFIO" v-html="$t('feedback.name')"/>
                    <span class="error" v-if="model.fio.length < 2 && errorFio" v-html="$t(errorFio)"/>
                </div>
                <div v-if="idForm !== '1'" class="col-sm-12 col-md-6 feedback__field">
                    <input
                        v-model="model.city"
                        id="feedbackСity"
                        autocomplete="false"
                        required="false"
                        name="city"
                        type="text"
                        maxlength="25"
                    />
                    <span class="bar"/>
                    <label class="feedback-modal-prehover" for="feedbackСity" v-html="$t('feedback.city')"/>
                </div>
            </div>
            <div class="row">
                <div
                    class="col-sm-6 col-md-6 feedback__field"
                    :class="{'error-field' : errorPhone && !model.phone}"
                >
                    <input-mask
                        v-model="model.phone"
                        id="feedbackTel"
                        mask="+7 (999) 999-99-99"
                        maskChar=""
                        autocomplete="false"
                        required="true"
                        name="tel"
                        type="text"
                    >
                    </input-mask>

                    <span class="bar"/>
                    <label class="feedback-modal-prehover" for="feedbackTel" v-html="$t('feedback.phone')"/>
                    <span class="error"
                          v-if="(model.phone.replace(/-/g, '').replace(/_/g, '').replace('(', '').replace(')', '').replace('+', '').length !== 11 && errorPhone=='feedback.noValidPhone') || (!model.phone && errorPhone)"
                          v-html="$t(errorPhone)"/>
                </div>
                <div
                    class="col-sm-12 col-md-6 feedback__field last"
                    :class="{'error-field' : (!validateEmail(model.email) && errorEmail=='feedback.noValidEmail') || (!model.email && errorEmail)}"
                >
                    <input
                        v-model="model.email"
                        id="feedbackEmail"
                        autocomplete="false"
                        required="true"
                        :class="{'not-empty': model.email, 'empty': !model.email}"
                        name="email"
                        type="email"
                        maxlength="35"
                    />
                    <span class="bar"/>
                    <label class="feedback-modal-prehover" for="feedbackEmail">E-mail</label>
                    <span
                        class="error"
                        v-if="(!validateEmail(model.email) && errorEmail=='feedback.noValidEmail') || (!model.email && errorEmail)"
                        v-html="$t('feedback.noValidEmail')"
                    />
                </div>
            </div>
            <!-- <div class="row" v-if="!notDateAndCountPeople">
                <div
                    class="col-sm-12 col-md-6 feedback__field"
                    :class="{'error-field' : errorDateFrom && !model.dateFrom }"
                >
                    <client-only>
                        <date-picker
                            id="dateFrom"
                            :format="$i18n.locale === 'en' ? 'MM.DD.YYYY' : 'DD.MM.YYYY'"
                            :lang="$i18n.locale === 'en' ? 'en' : 'ru'"
                            v-model="model.dateFrom"
                            :disabled-date="nowDateFunc"
                            :input-attr="{readonly: 'readonly'}"
                            @focus="barDatePicker = true"
                            @blur="barDatePicker = false"
                        >
                        </date-picker>
                        <span class="bar" :class="barDatePicker ? 'bar-datepicker-active' : ''"/>
                        <label
                            class="feedback-modal-prehover"
                            :class="model.dateFrom || barDatePicker ? 'label-datepicker-active' : ''"
                            for="feedbackEmail"
                            v-html="$t('feedback.arrivalDate')"
                        />

                        <span class="error" v-if="errorDateFrom && !model.dateFrom " v-html="$t(errorDateFrom)"/>
                    </client-only>
                </div>
                <div
                    class="col-sm-12 col-md-6 feedback__field"
                    :class="{'error-field' : errorCountPeople && !model.countPeople }"
                >
                    <input-mask
                        v-model="model.countPeople"
                        mask="99"
                        maskChar=""
                        id="feedbackCountPeople"
                        autocomplete="false"
                        required="true"
                        name="countPeople"
                        type="text"
                        maxlength="25"
                    />
                    <span class="bar"/>
                    <label class="feedback-modal-prehover" for="feedbackCountPeople" v-html="$t('feedback.countPeople')"/>
                    <span class="error" v-if="errorCountPeople && !model.countPeople" v-html="$t(errorCountPeople)"/>
                </div>
            </div> -->
            <div class="row">
                <div class="col-12 feedback__field feedback__field-comment">
                  <textarea
                      :class="{'not-empty': model.comment, 'empty': !model.comment}"
                      v-model="model.comment"
                      rows="1"
                      id="feedbackComment"
                      autocomplete="off"
                      name="common"
                      @keyup="adaptHeight"
                      @keydown="adaptHeight"
                  />
                    <span class="bar"/>
                    <label
                        class="feedback-modal-prehover"
                        for="feedbackComment"
                        v-html="$t('feedback.comment')"
                    />
                </div>
            </div>
        </div>
        <div class="feedback-modal__submit-btn">
            <anim-button
                @endAnim="submitForm"
                color="blue"
                :active="activeButton"
                :finish="finish"
            >{{ $t('feedback.send') }}
            </anim-button>
        </div>
        <div class="feedback-modal__checked">
            <input type="checkbox" id="feedbackCheck" @change="toggleButton" checked/>
            <label @click="model.checked = !model.checked" for="feedbackCheck">
                <div class="feedback-modal__checked-elem" :class="{'active': model.checked}"/>
                <div class="feedback-modal__checked_group">
                    <span v-html="$t('feedback.agreement')"/>
                    <nuxt-link
                        @click.native="model.checked = !model.checked"
                        v-if="$i18n.locale === 'ru'"
                        to="/policy/"
                        class="feedback-modal__agreement"
                        target="_blank"
                        v-html="$t('feedback.agreementLink')"
                    />
                    <nuxt-link
                        @click.native="model.checked = !model.checked"
                        v-if="$i18n.locale === 'en'"
                        to="/policy/"
                        class="feedback-modal__agreement"
                        target="_blank"
                        v-html="$t('feedback.agreementLink')"
                    />
                    <span v-html="$t('feedback.agreementBottom')"/>
                </div>
            </label>
        </div>
        <span class="error" v-if="!model.checked && errorChecked" v-html="$t(errorChecked)"/>
    </form>
</template>

<script>
import {Api} from "../../../api/api";
import animButton from "../../../components/button/button";
// import DatePicker from 'vue2-datepicker';
// import 'vue2-datepicker/index.css';
import $ from 'jquery';
// import codeCountriesJson from "../../../assets/code.json"

export default {
    name: "formFeedback",
    props: ["idForm", "dataForm3"],
    components: {
        animButton,
        // DatePicker
    },
    data() {
        return {
            model: {
                fio: "",
                phone: "",
                phoneCode: "+7",
                email: "",
                comment: "",
                city: "",
                checked: true,
                // dateFrom: '',
                countPeople: ''
            },
            modelName: {},
            errorEmail: "",
            errorFio: "",
            errorCode: "",
            errorCountPeople: "",
            // errorDateFrom: "",
            errorPhone: "",
            errorPhoneCode: "",
            errorChecked: "",
            activeButton: true,
            finish: false,
            // barDatePicker: false,
            // codeCountries: {},
        };
    },
    created() {
        if (this.idForm === "1") {
            this.modelName = {
                fio: "form_text_1",
                phone: "form_text_2",
                email: "form_text_3",
                // dateFrom: "form_date_36",
                countPeople: 'form_text_37',
                comment: "form_textarea_5",
                link: "form_text_29"
            };
        } else {
            this.modelName = {
                // dateFrom: "form_text_16",
                // dateTo: "form_text_17",
                adult: "form_text_18",
                children: "form_text_19",
                format: "form_text_21",
                locations: "form_textarea_22",
                fio: "form_text_23",
                phone: "form_text_24",
                email: "form_text_25",
                city: "form_text_26",
                comment: "form_textarea_27",
                link: "form_text_29"
            };
        }
    },
    mounted() {
        Api.getBase(
            `forms/${this.idForm}?lang=${this.$i18n.locale}&router=${this.$route.path}`
        )
            .then(response => {
                this.fieldsHidden = response.data?.data?.hidden_fields;
            })
            .catch(error => {
                console.log(error);
            });
        // this.codeCountries = codeCountriesJson.countries;
    },
    methods: {
        // nowDateFunc(date) {
        //     let nowDate = new Date();
        //     let nowDateStr = nowDate.toISOString().substr(0, 10);
        //     return date < new Date(nowDateStr + 'T00:00:00.000');
        // },
        validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },
        validateForm() {
            let isValidate = true;
            if (!this.model.checked) {
                isValidate = false;
                this.errorChecked = "feedback.required";
            }
            if (!this.model.fio) {
                isValidate = false;
                this.errorFio = "feedback.empty";
            } else {
                this.errorFio = "";
            }
            // if (!this.model.phoneCode) {
            //     isValidate = false;
            //     this.errorPhoneCode = "feedback.empty"
            // }
            if (!this.model.phone) {
                isValidate = false;
                this.errorPhone = "feedback.empty";
            } else {
                // Это вместо валидации
                this.errorPhone = "";

                // if (
                //     this.model.phone
                //         .replace(/-/g, "")
                //         .replace(/_/g, "")
                //         .replace("(", "")
                //         .replace(")", "")
                //         .replace("+", "").length !== 11
                //     && this.$i18n.locale === 'ru'
                // ) {
                //     isValidate = false;
                //     this.errorPhone = "feedback.noValidPhone";
                // } else {
                //     this.errorPhone = "";
                // }
            }
            if (!this.model.email) {
                isValidate = false;
                this.errorEmail = "feedback.empty";
            } else {
                if (!this.validateEmail(this.model.email)) {
                    isValidate = false;
                    this.errorEmail = "feedback.noValidEmail";
                } else {
                    this.errorEmail = "";
                }
            }
            if (!this.model.countPeople) {
                isValidate = false;
                this.errorCountPeople = "feedback.empty";
            } else {
                this.errorCountPeople = "";
            }
            // if (!this.model.dateFrom) {
            //     isValidate = false;
            //     this.errorDateFrom = "feedback.empty";
            // }
						//  else {
            //     this.errorDateFrom = "";
            // }
            return isValidate;
        },
        submitForm() {
            if (this.validateForm()) {
                // debugger;
                // const fullPhoneNumber = `${this.model.phoneCode}${this.model.phone}`
                let formData = new FormData();
                let sessid = this.fieldsHidden.filter(item => {
                    return item.name === "sessid";
                })[0].value;
                let WEB_FORM_ID = this.fieldsHidden.filter(item => {
                    return item.name === "WEB_FORM_ID";
                })[0].value;
                formData.append(this.modelName.fio, this.model.fio);
                // formData.append(this.modelName.phone, fullPhoneNumber);
                formData.append(this.modelName.phone, this.model.phone);
                formData.append(this.modelName.email, this.model.email);
                formData.append(this.modelName.comment, this.model.comment);
                // formData.append(this.modelName.dateFrom, this.model.dateFrom.toLocaleDateString());
                formData.append(this.modelName.countPeople, this.model.countPeople);
                formData.append(this.modelName.link, this.$route.path);
                formData.append("sessid", sessid);
                formData.append("WEB_FORM_ID", WEB_FORM_ID);
                formData.append("web_form_submit", "Y");
                if (this.idForm === "3") {
                    let locationName = '<ol>'
                    for (let i = 0; i < this.dataForm3.locations.length; i++) {
                        locationName += `<li>${this.dataForm3.locations[i].name}</li>`
                    }
                    locationName += '</ol>'
                    // formData.append(this.modelName.dateFrom, this.dataForm3.dateFrom);
                    // formData.append(this.modelName.dateTo, this.dataForm3.dateTo);
                    formData.append(this.modelName.adult, this.dataForm3.adult);
                    formData.append(this.modelName.children, this.dataForm3.children);
                    formData.append(this.modelName.format, this.dataForm3.format);
                    formData.append(this.modelName.locations, locationName);
                    formData.append(this.modelName.city, this.model.city);
                    formData.append(this.modelName.link, this.$route.path);
                }



                Api.postBase(
                    `forms/${this.idForm}?lang=${this.$i18n.locale}&router=${this.$route.path}`,
                    formData
                )
                    .then(response => {
                        this.$emit("isSuccess");
                        var sub = 'Отслеживаемая форма обратной связи';
                        var ct_site_id = '55078'; /* ID сайта внутри Calltouch */
                        var ct_data = {
                        fio: this.model.fio,
                        phoneNumber: this.model.phone,
                        email: this.model.email,
                        subject: sub,
                        // start: this.model.dateFrom.toLocaleDateString(),
                        count: this.model.countPeople,
                        comment: this.model.comment,
                        requestUrl: location.href,
                        sessionId: window.call_value,/* Чтобы определить источник заявки, передаем ID сессии Calltouch sessionId. Вместо wgblo7m9 нужно передавать mod_id скрипта Calltouch. */
                        };

                        console.log(ct_data, 'Good change');
                        if (!!this.model.phone && window.ct_snd_flag != 1){
                            window.ct_snd_flag = 1; setTimeout(function(){ window.ct_snd_flag = 0; }, 10000);
                            jQuery.ajax({
                            url: 'https://api.calltouch.ru/calls-service/RestAPI/requests/'+ct_site_id+'/register/',
                            dataType: 'json', type: 'POST', data: ct_data, async: false
                            });
                        }

                    })


                    .catch(error => {
                        console.log(error);
                    });

            }

            // event.preventDefault();
            return false;
        },
        adaptHeight({target}) {
            target.style.height = "auto";
            target.style.height = `${target.scrollHeight}px`;
        },
        toggleButton({target}) {
            this.activeButton = target.checked;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/config";
@import "~assets/scss/mixins";

.feedback-modal__form {
    max-width: 700px;
    width: 100%;
}

input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 50px #171920 inset; /* можно изменить на любой вариант цвета */
    -webkit-text-fill-color: #f4f4f4;
}

.error {
    color: #FEBE41;
    font-size: 11px;
    line-height: 1.5;
}

.error-field {
    input,
    /deep/.mx-input,
    select{
        border-bottom: 1px solid #FEBE41 !important;
    }

    label {
        color: #FEBE41 !important;
    }
}

.feedback-modal__submit-btn {
    display: flex;
    justify-content: center;
    margin: 30px 0 60px;
    align-items: center;

    @include respond-to(md) {
        margin-top: 55px;
    }

    @include respond-to(sm) {
        margin-top: 50px;
    }

    @include respond-to(xs) {
        margin-top: 40px;
    }

    /deep/ .animButton-btn {
        width: 360px;
        height: 80px;
        margin: 0 auto;

        @include respond-to(md) {
            width: 310px;
            height: 69px;
        }

        @include respond-to(xs) {
            max-width: 275px;
            width: auto;
            height: 50px;
        }
    }
}

.submit-btn {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 360px;
    height: 80px;
    margin: 60px auto 0;
    background: #163e97;
    background-position: center;
    transition: background 0.8s;
    border-radius: 140px;
    border: none;
    outline: none;
    cursor: pointer;

    font-family: 'Mpluse1p';
    font-weight: 500;
    font-size: 30px;
    text-align: center;
    text-transform: capitalize;
    color: #fbfbfb;

    &:hover {
        background: #163e97 radial-gradient(circle, transparent 1%, #163e97 1%) center/15000%;
    }

    &:active {
        background-color: #002f97;
        background-size: 100%;
        transition: background 0s;
    }

    @include respond-to(md) {
        margin-top: 55px;
        width: 310px;
        height: 69px;
    }

    @include respond-to(sm) {
        margin-top: 50px;
    }

    @include respond-to(xs) {
        width: 217px;
        height: 50px;
    }

    &:disabled {
        color: #4364f7;
    }
}

.feedback-modal__checked {
    display: flex;
    align-items: center;

    input {
        display: none;
    }

    label {
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 14px;
        line-height: 1.5;
        cursor: pointer;
        @include respond-to(sm) {
            font-size: 10px;
        }
    }

    a.feedback-modal__agreement {
        margin: 0 3px;
        border-bottom: 1px solid;
        color: white;
        position: relative;
    }
}

.feedback-modal__checked-elem {
    transition: all 0.5s;
    width: 46px;
    height: 46px;
    margin-right: 20px;
    cursor: pointer;
    position: relative;
    border: 2px solid white;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    @include respond-to(sm) {
        width: 36px;
        height: 36px;
    }

    &:before {
        opacity: 0;
        transition: all 0.5s;
        content: '';
        //background: url("~assets/img/checkbox/arrow.png") no-repeat;
        background: url("~@/assets/img/checkbox/check.svg?data") no-repeat;
        position: absolute;
        width: 16px;
        height: 12px;
        z-index: 2;
    }

    &.active {
        .feedback-modal__checked-elem__bg-color {
            opacity: 1;
        }

        &:before {
            opacity: 1;
        }
    }
}

.feedback-modal__checked_group {
    // max-width: 286px;

    font-size: 16px;

    @include respond-to(md) {
        font-size: 14px;
    }

    @include respond-to(xs) {
        font-size: 12px;
    }
}

.feedback-modal__headline {
    color: #f5f4ff;
    margin-bottom: 80px;
    @include respond-to(sm) {
        margin-bottom: 20px;
    }
}

.feedback-modal__form-elements {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.feedback-modal__block {
    @include respond-to(sm) {
        width: 100%;
    }
}

.feedback__field {
    position: relative;
    margin-bottom: 55px;

    @include respond-to(sm) {
        margin-bottom: 50px;
    }

    @include respond-to(xs) {
        margin-bottom: 20px;
    }

    input {
        border: none;
        border-bottom: 1px solid #f5f4ff;
        outline: none;
        background: transparent;

        @include respond-to(md) {
            font-size: 15px;
        }
    }

    textarea {
        border: none;
        border-bottom: 1px solid #f5f4ff;
        background: transparent;
        outline: none;
        width: 100%;
        padding: 10px;
        color: #f5f4ff;
        resize: none;
        font-size: 14px;
        line-height: 1.5;
        overflow: hidden;
        @include respond-to(sm) {
            width: 100%;
            height: 40px;
            padding: 10px;
        }
    }
}

.feedback__field-select {
    background: transparent;
    border: 0;
    outline: 0;
    color: #fff;
    line-height: 1.5;
    padding: 10px;
    height: 48px;
    border-bottom: 1px solid #fff;
    font-size: 15px;
    width: 100%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: unset;
    caret-color: #ffffff;
    background: url("~assets/img/icons/arrow_down.svg") no-repeat;
    background-position: right center;
    @include respond-to(md) {
        height: 43px;
    }
}

.feedback__field-comment {
    margin-bottom: 30px;

    label {
        color: #f5f4ff;
        font-size: 18px;
        line-height: 1.5;
        margin-bottom: 10px;
        display: block;
        margin-top: 6px;
        top: 0 !important;
        @include respond-to(sm) {
            font-size: 16px;
        }
    }
}

input {
    font-size: 18px;
    line-height: 1.5;
    padding: 10px;
    color: #f5f4ff;
    display: block;
    border: none;
    width: 100%;
    border-bottom: 1px solid #ccc;
    @include respond-to(sm) {
        width: 100%;
        font-size: 16px;
        line-height: 1.5;
    }
}

input:focus {
    outline: none;
}

label.feedback-modal-prehover {
    color: #f5f4ff;
    font-size: 18px;
    position: absolute;
    pointer-events: none;
    left: 24px;
    top: 12px;
    transition: 0.4s ease all;
    -moz-transition: 0.4s ease all;
    -webkit-transition: 0.4s ease all;
    @include respond-to(md) {
        top: 10px;
    }
    @include respond-to(sm) {
        width: 100%;
        height: 100px;
        font-size: 16px;
        top: 10px;
    }
}

/* active state */
.feedback__field {
    input:focus ~ label,
    input:valid ~ label,
    select:focus ~ label,
    select.not-empty ~ label,
    input.not-empty ~ label,
    .label-datepicker-active{
        top: -13px !important;
        font-size: 14px;
        color: white;
    }

    textarea:focus ~ label,
    textarea.not-empty ~ label {
        top: -27px !important;
        font-size: 14px !important;
    }
}

/* BOTTOM BARS ================================= */
.bar {
    position: relative;
    display: block;
    width: 100%;
    @include respond-to(sm) {
        width: 100%;
    }
}

.bar:before,
.bar:after {
    content: "";
    height: 2px;
    width: 0;
    bottom: 0;
    position: absolute;
    background: #1dcfff;
    transition: 0.5s ease all;
    -moz-transition: 0.5s ease all;
    -webkit-transition: 0.5s ease all;
}

textarea ~ .bar:before,
textarea ~ .bar:after {
    bottom: 4px;
}

.feedback-form-3 {
    textarea ~ .bar:before,
    textarea ~ .bar:after {
        bottom: 4px;
    }
}

.bar:before {
    left: 50%;
}

.bar:after {
    right: 50%;
}

/* active state */
input:focus ~ .bar:before,
input:focus ~ .bar:after,
textarea:focus ~ .bar:before,
textarea:focus ~ .bar:after,
select:focus ~ .bar:before,
select:focus ~ .bar:after,
.bar-datepicker-active:after,
.bar-datepicker-active:before{
    width: 50%;
}
/deep/.mx-datepicker {
    width: 100%;
    max-width: 100%;
}
/deep/.mx-input {
    border: none;
    border-bottom: 1px solid #f5f4ff;
    outline: none;
    background: transparent;
    font-size: 18px;
    line-height: 1.5;
    padding: 10px;
    color: #f5f4ff;
    display: block;
    width: 100%;
    max-width: 100%;
    height: auto;
    box-shadow: none;
    border-radius: 0;
}
/deep/.mx-icon-clear {
    color: #fff;
}
</style>
