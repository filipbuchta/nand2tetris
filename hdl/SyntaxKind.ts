
enum SyntaxKind {
    EndOfFileToken,
    EqualsToken,
    OpenParenToken,
    CloseParenToken,
    OpenBraceToken,
    CloseBraceToken,
    CommaToken,
    SemicolonToken,
    ColonToken,
    OpenBracketToken,
    CloseBracketToken,
    DotDotToken,

    NumericLiteral,

    BuiltInKeyword,
    ClockedKeyword,
    ChipKeyword,
    InKeyword,
    OutKeyword,
    PartsKeyword,

    Identifier,

    Unknown,
}

export default SyntaxKind;