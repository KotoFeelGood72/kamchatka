<script>
    import heading from "./content/heading";
    // import InfoSlider from "./infoSlider/infoSlider";
    export default {
        // components: {InfoSlider},
        functional: true,
        props: {
            template: {
                type: String,
                default: ""
            }
        },
        render(h, context) {
            const template = context.props.template;

            const dynComponent = {
                template,
                components: {
                    heading,
                    InfoSlider
                }
            };
            const component = template ? dynComponent : heading;
            return h(component);
        }
    };
</script>

<style scoped>

</style>
