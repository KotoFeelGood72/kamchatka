<script>
    import heading from "./content/heading";
    import infoslider from "./infoSlider/infoSliderOutside";
    export default {
        components: {infoslider},
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
                    infoslider
                }
            };
            const component = template ? dynComponent : heading;
            return h(component);
        }
    };
</script>

<style scoped>

</style>
