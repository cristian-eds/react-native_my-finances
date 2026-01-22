import React from 'react';
import { Modal, ScrollView, Text, View } from 'react-native';

import { styles } from './ModalTermsPolicyPrivacyStyles';
import { ModalContainer } from '../structure/ModalContainer/ModalContainer';
import { ModalContent } from '../structure/ModalContent/ModalContent';
import { ModalHeader } from '../structure/ModalHeader/ModalHeader';
import { ButtonBack } from '../../buttons/ButtonBack/ButtonBack';
import { Row } from '../../structure/Row/Row';
import { Spacer } from '../../Spacer/Spacer';
import { ModalFooter } from '../structure/ModalFooter/ModalFooter';
import { ButtonIconAction, Mode } from '../../buttons/ButtonConfirm/ButtonIconAction';
import { DividerTextMiddle } from '../../DividerTextMiddle/DividerTextMiddle';

interface ModalTermsPolicyPrivacyProps {
    isShow: boolean,
    onClose: () => void,
    onAccept?: () => void;
}

export function ModalTermsPolicyPrivacy({ isShow, onClose, onAccept }: ModalTermsPolicyPrivacyProps) {

    const renderLastModified = () => {
        return <Text style={styles.textUpdate}>Última atualização: 13/01/2026</Text>
    }

    const handleClose = () => {
        onAccept && onAccept();
        onClose()
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isShow}
            statusBarTranslucent={true}
        >
            <ModalContainer>
                <ModalContent>
                    <ModalHeader>
                        <ButtonBack onPress={onClose} />
                        <Row style={{ flex: 4, justifyContent: 'center' }}>
                            <Text style={styles.title}>Termos e Políticas de Privacidade</Text>
                        </Row>
                        <Spacer />
                    </ModalHeader>
                    <View style={{ height: 400 }}>
                        <ScrollView >
                            <Text style={styles.subtitle}>⚖️ Termos</Text>
                            {renderLastModified()}
                            <Text style={styles.text}>
                                1. Aceitação dos Termos: Ao baixar e utilizar o aplicativo Minhas Finanças,
                                você concorda integralmente com estes Termos de Uso. Caso não concorde com qualquer parte,
                                recomendamos que não utilize o aplicativo.
                            </Text>
                            <Text style={styles.text}>
                                2. Descrição do Serviço:
                                O Minhas Finanças é uma ferramenta de suporte para organização financeira pessoal.
                                O aplicativo permite que o usuário registre receitas,
                                despesas e contas à pagar e à receber para facilitar o controle de seu próprio patrimônio.
                            </Text>
                            <Text style={styles.text}>3. Responsabilidades do Usuário:</Text>
                            <Text style={styles.text}>Veracidade: Você é o único responsável pela precisão dos dados inseridos.</Text>
                            <Text style={styles.text}>Segurança: Manter a segurança da sua senha e o acesso ao seu dispositivo é de sua inteira responsabilidade.</Text>
                            <Text style={styles.text}>Uso Pessoal: Este aplicativo é destinado ao uso pessoal e não comercial.</Text>
                            <Text style={styles.text}>4. Isenção de Responsabilidade (Importante):
                                O Minhas Finanças não fornece consultoria financeira, jurídica.
                                As análises e gráficos gerados são automáticos com base nos dados que você insere.
                                Não nos responsabilizamos por perdas financeiras ou decisões
                                tomadas com base nas informações contidas no app.
                            </Text>
                            <Text style={styles.text}>
                                5. Propriedade Intelectual Todo o design, interface,
                                logotipos e códigos do aplicativo são de propriedade exclusiva de Cristian (gitHub.com/cristian-eds).
                            </Text>
                            <DividerTextMiddle text="" />
                            <Text style={styles.subtitle}>🔒 Política de Privacidade</Text>
                            {renderLastModified()}
                            <Text style={styles.text}>1. Informações utilizadas</Text>
                            <Text style={styles.text}>Dados de Cadastro: Nome e e-mail.</Text>
                            <Text style={styles.text}>Dados Financeiros: Registros de gastos, ganhos e categorias criadas por você.</Text>
                            <Text style={styles.text}>Dados Técnicos: Versão do sistema operacional e modelo do dispositivo para fins de correção de erros.</Text>
                            <Text style={styles.text}>2. Como Usamos seus Dados Seus dados são utilizados exclusivamente para:</Text>
                            <Text style={styles.text}>Processar e exibir seus relatórios financeiros dentro do app.</Text>
                            <Text style={styles.text}>Melhorar a experiência do usuário e corrigir falhas técnicas.</Text>
                            <Text style={styles.text}>[Opcional] Enviar notificações de lembrete sobre suas contas.</Text>
                            <Text style={styles.text}>
                                3. Segurança e Armazenamento: A segurança dos seus dados é nossa prioridade.
                                Utilizamos criptografia de ponta e protocolos de segurança para proteger suas informações.
                                Os dados gerados ficam salvos apenas em uma base local em seu próprio dispositivo.
                            </Text>
                            <Text style={styles.text}>4. Seus Direitos (LGPD) De acordo com a Lei Geral de Proteção de Dados, você tem o direito de:</Text>
                            <Text style={styles.text}>Acessar e corrigir seus dados a qualquer momento.</Text>
                            <Text style={styles.text}>Solicitar a exclusão definitiva da sua conta e de todos os dados associados.</Text>
                        </ScrollView>
                    </View>
                    <ModalFooter>
                        <ButtonIconAction iconName='checkmark-sharp' onPress={handleClose} mode={Mode.CONFIRM} />
                    </ModalFooter>
                </ModalContent>
            </ModalContainer>
        </Modal >
    );
}